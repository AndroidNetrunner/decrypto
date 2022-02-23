import { Server, Socket } from 'socket.io';
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from '../interface/io.interface';
import Game from '../models/Game';
import User from '../models/User';

type SocketType = Socket<ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData>;
type ServerType = Server<ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData>;

const getPublicRooms = (io: ServerType) => {
  const {
    sockets: {
      adapter: { sids, rooms },
    },
  } = io;
  const publicRooms: string[] = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  });
  return publicRooms;
};

/*
  * socket 통신의 문제점
  ! 이후에 들어온 사람은 기존에 들어와있던 클라이언트를 모르기에 데이터 동기화가 필요하다.
  
  ? 생각한 sync 방법
  a. DB 필요, 데이터 요청 적음 <- 솔직히 이게 best 같음
    1. game(room) 단위로 들어오는 사용자 정보를 db 에 저장한다.
    2. 추후에 입장한 클라이언트는 해당 room 의 데이터를 fetch 나 socket 이벤트로 수신한다.
    장점
      1. room 상태 컨트롤 가능
      2. 데이터 요청 적음
      3. 처음 한 번 initial data 요청 후 그 후부턴 socket 이벤트로 처리 가능
    문제점
      1. 할 줄 모름 ㅅㅂ 했다 ㄹㅇ

  b. DB 불필요 
    1. 추후에 입장한 클라이언트 측에서 roomId, requestSocketId 와 함께 InitialData:Request 이벤트를 보낸다.
    2. InitialData:Request 이벤트를 수신한 서버는 broadcast 를 통해 요청한 socket 을 제외한 roomId 에 들어와있는 모든 사용자에게 InitialData:Request 이벤트를 보낸다.
    3. InitialData:Request 이벤트를 수신한 기존에 방에 참가한 클라이언트들은 자신의 userData, requestSocketId 와 함께 서버에게 InitialData:Response 이벤트를 보낸다.
    4. InitialData:Response 이벤트를 수신한 서버는 전달받은 requestSocketId 에게 직속으로 userData 와 함께 InitialData:Response 이벤트를 보낸다.
    5. InitialData:Response 이벤트를 수신한 클라이언트는 userData 를 받아 처리한다. (아마도 기존 방에 참가한 유저 수만큼 응답이 올 것이다.)
    장점
      1. 바로 구현 가능
    문제점
      1. 데이터 요청 많음
      2. room 상태 컨트롤 불가
      3. 이해하기 어려움
*/

/*
  시나리오

  1. 유저가 입장했을 때 (새로운 방)
    db
      user 컬렉션에서 uid 를 확인 후 없다면 유저를 하나 만든다. ok
      유저가 있다면 uid 확인 후 해당 유저 정보를 전달받은 nick 으로 업데이트 한다. ok
      game 컬렉션을 roomId 를 제공하여 생성한다. ok
      처음 만들어진다면 isOwner = true
      game 컬렉션 users 에 유저를 추가한다(uid, nickname, entryTime, team). ok ref로 연결
    socket
      socket data 에 유저 정보, owner 정보를 를 추가한다. ok
      socket 을 room 에 추가한다. ok
      기존 참가해있던 유저들에게 새로 들어온 유저의 정보와 초기 팀과 함께 이벤트를 발생한다.
      * 매번 요청이 올 때 socket data 의 uid 를 확인하여 작업한다. 
  
  2. 유저가 떠났을 때
    db
      game 컬렉션 users 에서 isOwner 를 확인한다. 
      isOwner
        true 이면 entryTime 을 확인 후 가장 먼저 들어온 유저의 isOwner 를 true 로 변경
        false 면 다음으로 진행
      game 컬렉션 users 에서 해당 user 삭제. ok
    socket
      다른 유저들에게 해당 유저가 나갔음을 알려줘야 한다.
      나간 유저
        방장이라면 db 조작 후 남은 유저들에게 게임 정보나 팀 정보를 다시 보낸다.
        바뀐 방장에겐 CHANGE_OWNER 이벤트를 발생시킨다.
        client 는 데이터 확인 후 업데이트

  3. 팀 변경할 때
    db
      변경이 일어난 uid 확인 후 User db 업데이트한다.
    game 컬렉션 users 에서 해당 socket 의 uid 필터로 가져와 팀을 변경한다.
    socket
      다른 유저들에게 변경이 일어난 uid 와 함께 이벤트를 보낸다.
*/
const handleSocket = (io: ServerType) => {
  return (socket: SocketType) => {
    socket.onAny((event) => {
      console.log('📡 Socket Event : ', event);
    });

    socket.on('ENTER_ROOM', async (userInfo, done) => {
      const { nickname, roomId, uid } = userInfo;
      let team;
      try {
        const game = await Game.findOne({ roomId });
        if (game?.isPlay) {
          console.log('isPlay');
          return socket.to(socket.id).emit('ALREADY_START');
        }
        let user = await User.findOne({ uid });
        if (user) {
          await user.updateOne({ $set: { nickname } });
        } else {
          user = await User.create({ nickname, uid });
        }
        socket.data = {
          roomId,
          user: { nickname, uid, isOwner: false, id: user?.id, isRedTeam: true },
        };
        if (game) {
          await user?.updateOne({ isOwner: false });
          if (game.team.redTeam.users.length > game.team.blueTeam.users.length) {
            team = 'blue';
            socket.data.user!.isRedTeam = false;
            await game.updateOne({ $push: { 'team.blueTeam.users': user?.id } });
          } else {
            team = 'red';
            await game.updateOne({ $push: { 'team.redTeam.users': user?.id } });
          }
        } else {
          await user?.updateOne({ $set: { isOwner: true } });
          socket.data.user!.isOwner = true;
          await Game.create({ roomId, team: { redTeam: { users: [user?.id] } } });
        }
        socket.join(roomId);
        done(roomId);
        socket.broadcast.to(roomId).emit('ENTER_ROOM', socket.data.user, team);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on('CHANGE_TEAM', async (uid, to, done) => {
      const { roomId, user } = socket.data;
      try {
        const game = await Game.findOne({ roomId });
        if (game && user && user.id) {
          if (to === 'red') {
            await game.updateOne({ $pull: { 'team.blueTeam.users': user?.id } });
            await game.updateOne({ $push: { 'team.redTeam.users': user?.id } });
          } else if (to === 'blue') {
            await game.updateOne({ $pull: { 'team.redTeam.users': user?.id } });
            await game.updateOne({ $push: { 'team.blueTeam.users': user?.id } });
          }
        }
      } catch (error) {
        console.log(error);
      }
      if (roomId && user) {
        socket.data.user!.isRedTeam = !user?.isRedTeam;
        socket.broadcast.to(roomId).emit('CHANGE_TEAM', user, to);
      }
      done();
    });

    socket.on('disconnecting', async () => {
      const { roomId, user } = socket.data;
      const numberOfClients = io.sockets.adapter.rooms.get(roomId as string)?.size;
      // TODO: 리팩토링 필요

      try {
        const game = await Game.findOne({ roomId });
        if (numberOfClients === 1) {
          await game?.delete({ roomId });
          return;
        }
        if (user?.isRedTeam) {
          await game?.updateOne({ $pull: { 'team.redTeam.users': user?.id } });
        } else {
          await game?.updateOne({ $pull: { 'team.blueTeam.users': user?.id } });
        }
      } catch (error) {
        console.log(error);
      }
      if (roomId && user) {
        const team = user.isRedTeam ? 'red' : 'blue';
        socket.broadcast.to(roomId).emit('LEAVE_ROOM', user, team);
      }
    });
    /*
    socket.on('initData:request', (roomId, requestSocketId) => {
      console.log('check');
      socket.broadcast.to(roomId).emit('initData:request', requestSocketId);
    });

    socket.on('initData:response', (userData, requestSocketId) => {
      console.log('request from ', requestSocketId);
      socket.to(requestSocketId).emit('initData:response', userData);
    });
    */
    /*
    io.of('/').adapter.on('join-room', (room, id) => {
      console.log(room, id);
    });
    */
  };
};

export default handleSocket;
