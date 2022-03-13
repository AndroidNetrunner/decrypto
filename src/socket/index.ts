import { Server, Socket } from 'socket.io';
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from '../interface/io.interface';
import Game, { IGame } from '../models/Game';
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

const handleSocket = (io: ServerType) => {
  return (socket: SocketType) => {
    socket.onAny((event) => {
      console.log('📡 Socket Event : ', event);
    });

    socket.on('ENTER_ROOM', async (userInfo, done) => {
      const { nickname, roomId, uid } = userInfo;
      let team;
      try {
        let game = await Game.findOne({ roomId });
        if (game?.isPlaying) {
          console.log('isPlaying');
          return socket.to(socket.id).emit('ALREADY_START');
        }
        let user = await User.findOne({ uid });
        if (user) {
          user = await User.findOneAndUpdate({ uid }, { $set: { nickname } }, { new: true });
        } else {
          user = await User.create({ nickname, uid });
        }
        socket.data = {
          roomId,
          user: { nickname, uid, isOwner: false, id: user?.id, isSovietTeam: true },
        };
        if (game) {
          user = await User.findOneAndUpdate({ uid }, { isOwner: false }, { new: true });
          if (game.sovietTeam.users.length > game.usaTeam.users.length) {
            team = 'usa';
            socket.data.user!.isSovietTeam = false;
            game = await Game.findOneAndUpdate(
              { roomId },
              { $push: { 'usaTeam.users': user?.id } },
              { new: true }
            );
          } else {
            team = 'soviet';
            game = await Game.findOneAndUpdate(
              { roomId },
              { $push: { 'sovietTeam.users': user?.id } },
              { new: true }
            );
          }
        } else {
          user = await User.findOneAndUpdate({ uid }, { $set: { isOwner: true } }, { new: true });
          socket.data.user!.isOwner = true;
          game = await Game.create({ roomId, sovietTeam: { users: [user?.id] } });
        }
        socket.join(roomId);
        done(roomId);
        socket.broadcast.to(roomId).emit('ENTER_ROOM', socket.data.user, team);
        if (game && user) {
          const isSovietTeam = team === 'soviet';
          const gameInfo = await game.populate(['sovietTeam.users', 'usaTeam.users']);
          io.to(socket.id).emit('INIT_DATA', gameInfo, { ...user.toObject(), isSovietTeam });
        }
      } catch (error) {
        console.log(error);
      }
    });

    socket.on('CHANGE_TEAM', async (uid, to, done) => {
      const { roomId, user } = socket.data;
      try {
        const game = await Game.findOne({ roomId });
        if (game && user && user.id) {
          if (to === 'soviet') {
            await game.updateOne({ $pull: { 'usaTeam.users': user?.id } });
            await game.updateOne({ $push: { 'sovietTeam.users': user?.id } });
          } else if (to === 'usa') {
            await game.updateOne({ $pull: { 'sovietTeam.users': user?.id } });
            await game.updateOne({ $push: { 'usaTeam.users': user?.id } });
          }
        }
      } catch (error) {
        console.log(error);
      }
      if (roomId && user) {
        user.isSovietTeam = !user.isSovietTeam;
        socket.broadcast.to(roomId).emit('CHANGE_TEAM', user, to);
      }
      done();
    });

    socket.on('disconnecting', async () => {
      const { roomId, user } = socket.data;
      const numberOfClients = io.sockets.adapter.rooms.get(roomId as string)?.size;
      try {
        const game = await Game.findOne({ roomId });
        if (numberOfClients === 1) {
          await game?.delete({ roomId });
          return;
        }
        if (user?.isSovietTeam) {
          await game?.updateOne({ $pull: { 'sovietTeam.users': user?.id } });
        } else {
          await game?.updateOne({ $pull: { 'usaTeam.users': user?.id } });
        }
      } catch (error) {
        console.log(error);
      }
      if (roomId && user) {
        const team = user.isSovietTeam ? 'soviet' : 'usa';
        socket.broadcast.to(roomId).emit('LEAVE_ROOM', user, team);
      }
    });
  };
};

export default handleSocket;
