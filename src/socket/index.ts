import { Server, Socket } from 'socket.io';
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from '../interface/io.interface';
import Code from '../models/Code';
import Game from '../models/Game';
import User from '../models/User';
import Word from '../models/Word';

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
      console.log('🤷🏻‍♂️ Socket Data : ', socket.data);
    });

    socket.on('ENTER_ROOM', async (userInfo, done) => {
      const { nickname, roomId, uid } = userInfo;
      try {
        let game = await Game.findOne({ roomId });
        if (game?.isPlaying) {
          console.log('isPlaying');
          socket.to(socket.id).emit('ALREADY_START');
          return;
        }
        let user = await User.findOne({ uid });
        if (user) {
          user = await User.findOneAndUpdate({ uid }, { $set: { nickname } }, { new: true });
        } else {
          user = await User.create({ nickname, uid });
        }
        socket.data = {
          roomId,
          user: { nickname, uid, captain: false, id: user?.id, isSovietTeam: true },
        };
        if (game) {
          user = await User.findOneAndUpdate({ uid }, { captain: false }, { new: true });
          if (game.sovietTeam.players.length > game.usaTeam.players.length) {
            socket.data.user!.isSovietTeam = false;
            game = await Game.findOneAndUpdate(
              { roomId },
              { $push: { 'usaTeam.players': user?.id } },
              { new: true }
            );
          } else {
            game = await Game.findOneAndUpdate(
              { roomId },
              { $push: { 'sovietTeam.players': user?.id } },
              { new: true }
            );
          }
        } else {
          user = await User.findOneAndUpdate({ uid }, { $set: { captain: true } }, { new: true });
          socket.data.user!.captain = true;
          game = await Game.create({ roomId, sovietTeam: { players: [user?.id] } });
        }
        socket.join(roomId);
        done(roomId);
        if (game && user) {
          const gameInfo = await game.populate(['sovietTeam.players', 'usaTeam.players']);
          socket.broadcast.to(roomId).emit('ENTER_ROOM', gameInfo);
          io.to(socket.id).emit('INIT_DATA', gameInfo, user);
        }
      } catch (error) {
        console.log(error);
      }
    });

    socket.on('CHANGE_TEAM', async (userData, done) => {
      const { roomId, user } = socket.data;
      const { _id: id } = userData;
      try {
        let userInfo;
        const game = await Game.findOne({ roomId });
        if (game && user && user.id) {
          const isSovietTeam = game.sovietTeam.players.find(
            (player) => player._id.toString() === id.toString()
          );
          if (!isSovietTeam) {
            await game.updateOne({
              $pull: { 'usaTeam.players': user?.id },
              $push: { 'sovietTeam.players': user?.id },
            });
            socket.data.user!.isSovietTeam = true;
            userInfo = await User.findOneAndUpdate(
              { uid: userData.uid },
              { $set: { isSovietTeam: true } },
              { new: true }
            );
          } else if (isSovietTeam) {
            await game.updateOne({
              $pull: { 'sovietTeam.players': user?.id },
              $push: { 'usaTeam.players': user?.id },
            });
            socket.data.user!.isSovietTeam = false;
            userInfo = await User.findOneAndUpdate(
              { uid: userData.uid },
              { $set: { isSovietTeam: false } },
              { new: true }
            );
          }
        }
        const gameInfo = await Game.findOne({ roomId }).populate([
          'sovietTeam.players',
          'usaTeam.players',
        ]);
        if (roomId && user && gameInfo && userInfo) {
          user.isSovietTeam = !user.isSovietTeam;
          socket.broadcast.to(roomId).emit('CHANGE_TEAM', gameInfo);
          done(gameInfo, userInfo);
        }
      } catch (error) {
        console.log(error);
      }
    });

    socket.on('SET_TIMER', async (gameTime) => {
      const { roomId } = socket.data;
      try {
        let game = await Game.findOne({ roomId });
        if (game) {
          game = await Game.findOneAndUpdate(
            { roomId },
            { $set: { timer: gameTime } },
            { new: true }
          ).populate(['sovietTeam.players', 'usaTeam.players']);
        }
      } catch (error) {
        console.log(error);
      }
    });

    socket.on('GAME_START', async (done) => {
      const { roomId } = socket.data;
      if (roomId) {
        try {
          let gameInfo = await Game.findOneAndUpdate(
            { roomId },
            { $inc: { stageNumber: 1 } },
            { new: true }
          ).populate(['sovietTeam.players', 'usaTeam.players']);
          if (gameInfo) {
            const randomWords = await Word.aggregate([{ $sample: { size: 8 } }]);
            const answerCode = await Code.aggregate([{ $sample: { size: 1 } }]);
            gameInfo = await Game.findOneAndUpdate(
              { roomId },
              {
                $set: {
                  'sovietTeam.words': [
                    randomWords[0].word,
                    randomWords[1].word,
                    randomWords[2].word,
                    randomWords[3].word,
                  ],
                  'usaTeam.words': [
                    randomWords[4].word,
                    randomWords[5].word,
                    randomWords[6].word,
                    randomWords[7].word,
                  ],
                  'answerCode': answerCode[0].code,
                },
              },
              { new: true }
            ).populate(['sovietTeam.players', 'usaTeam.players']);
            if (gameInfo) {
              socket.to(roomId).emit('GAME_START', gameInfo);
              done(gameInfo);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    });

    /*
      stage++
      hints 넣어주기
    */

    socket.on('SUBMIT_HINT', async (hints, done) => {
      const { roomId, user } = socket.data;
      if (roomId && user) {
        const submitTeam = user.isSovietTeam ? 'sovietTeam.hints' : 'usaTeam.hints';
        try {
          let gameInfo = await Game.findOneAndUpdate(
            { roomId },
            { $inc: { stageNumber: 1 }, $push: { [submitTeam]: hints } },
            { new: true }
          ).populate(['sovietTeam.players', 'usaTeam.players']);
          if (gameInfo) {
            socket.to(roomId).emit('SUBMIT_HINT', gameInfo);
            done(gameInfo);
          }
        } catch (error) {
          console.log(error);
        }
      }
    });

    // 우선 각 팀 code 업데이트 ok
    // submit code 양 팀 둘 다 업데이트 ok
    // 만약 양 팀 모두 코드 제출됐을 때 아래로,, ok
    // showResult(gameInfo) 이벤트 보내기 ok
    // stage ++, answerCode 갱신, 각 팀 code null 초기화
    // 5초 후에 newRound(gameInfo) 보내기
    //
    socket.on('SUBMIT_CODE', async (hints) => {
      const { roomId, user } = socket.data;
      if (roomId && user) {
        const submitTeam = user.isSovietTeam ? 'sovietTeam.codes' : 'usaTeam.codes';
        console.log(hints);
        let gameInfo = await Game.findOne({ roomId }).populate([
          'sovietTeam.players',
          'usaTeam.players',
        ]);
        try {
          if (gameInfo?.$isEmpty(submitTeam)) {
            gameInfo = await Game.findOneAndUpdate(
              { roomId },
              { $push: { [submitTeam]: hints } },
              { new: true }
            ).populate(['sovietTeam.players', 'usaTeam.players']);
          }
          if (gameInfo) {
            const passCondition =
              !gameInfo.$isEmpty('sovietTeam.codes') && !gameInfo.$isEmpty('usaTeam.codes');
            if (!passCondition) {
              socket.to(roomId).emit('SUBMIT_CODE', gameInfo);
              io.to(socket.id).emit('SUBMIT_CODE', gameInfo);
            }
            if (passCondition) {
              // soviet 힌트 제출 상황
              let sovietWrong = 0;
              let usaWrong = 0;
              let sovietInterrupt = 0;
              let usaInterrupt = 0;
              if (gameInfo.stageNumber % 4 <= 1) {
                if (gameInfo.answerCode.toString() !== gameInfo.sovietTeam.codes.toString()) {
                  sovietWrong = 1;
                }
                if (gameInfo.answerCode.toString() === gameInfo.usaTeam.codes.toString()) {
                  usaInterrupt = 1;
                }
              } else {
                if (gameInfo.answerCode.toString() !== gameInfo.usaTeam.codes.toString()) {
                  usaWrong = 1;
                }
                if (gameInfo.answerCode.toString() === gameInfo.sovietTeam.codes.toString()) {
                  sovietInterrupt = 1;
                }
              }
              gameInfo = await gameInfo.populate(['sovietTeam.players', 'usaTeam.players']);
              io.to(socket.id).emit('SHOW_RESULT', gameInfo);
              socket.to(roomId).emit('SHOW_RESULT', gameInfo);
              setTimeout(async () => {
                const answerCode = await Code.aggregate([{ $sample: { size: 1 } }]);
                gameInfo = await Game.findOneAndUpdate(
                  { roomId },
                  {
                    $inc: {
                      'stageNumber': 1,
                      'usaTeam.greenToken': usaInterrupt,
                      'usaTeam.redToken': usaWrong,
                      'sovietTeam.greenToken': sovietInterrupt,
                      'sovietTeam.redToken': sovietWrong,
                    },
                    $set: {
                      'answerCode': answerCode[0].code,
                      'sovietTeam.codes': [],
                      'usaTeam.codes': [],
                    },
                  },
                  { new: true }
                ).populate(['sovietTeam.players', 'usaTeam.players']);
                if (gameInfo) {
                  io.to(socket.id).emit('NEW_ROUND', gameInfo);
                  socket.to(roomId).emit('NEW_ROUND', gameInfo);
                }
              }, 5000);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    });

    socket.on('disconnecting', async () => {
      const { roomId, user } = socket.data;
      const numberOfClients = io.sockets.adapter.rooms.get(roomId as string)?.size;
      try {
        let game = await Game.findOne({ roomId });
        if (numberOfClients === 1) {
          await game?.delete({ roomId });
          return;
        }
        if (user?.isSovietTeam) {
          game = await Game.findOneAndUpdate(
            { roomId },
            { $pull: { 'sovietTeam.players': user?.id } },
            { new: true }
          );
        } else {
          game = await Game.findOneAndUpdate(
            { roomId },
            { $pull: { 'usaTeam.players': user?.id } },
            { new: true }
          );
        }
        if (roomId && game) {
          const gameInfo = await game.populate(['sovietTeam.players', 'usaTeam.players']);
          socket.broadcast.to(roomId).emit('LEAVE_ROOM', gameInfo);
        }
      } catch (error) {
        console.log(error);
      }
    });
  };
};

export default handleSocket;
