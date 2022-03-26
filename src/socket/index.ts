import { Server, Socket } from 'socket.io';
import logger from '../config/winston';
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
      logger.info(
        `📡 Socket Event : ${event} | ${socket.data.user?.nickname} | ${socket.data.user?.uid}`
      );
    });

    socket.on('ENTER_ROOM', async (userInfo, done) => {
      const { nickname, roomId, uid } = userInfo;
      try {
        let gameInfo;
        const game = await Game.findOne({ roomId });
        if (game?.isPlaying) {
          logger.error(
            `❌ FAIL | ENTER_ROOM : ALREADY_START | roomId : ${roomId} | ${userInfo.nickname} | ${userInfo.uid}`
          );
          socket.to(socket.id).emit('ALREADY_START');
          return;
        }
        let user = await User.findOne({ uid });
        if (user) {
          user = await User.findOneAndUpdate(
            { uid },
            { $set: { nickname, captain: false } },
            { new: true }
          );
        } else {
          user = await User.create({ nickname, uid });
        }
        socket.data = {
          roomId,
          user: { nickname, uid, captain: false, id: user?.id, isSovietTeam: true },
        };
        if (game) {
          const teamJoinCondition = game.sovietTeam.players.length > game.usaTeam.players.length;
          const joinTeam = teamJoinCondition ? 'usaTeam.players' : 'sovietTeam.players';
          const anotherTeam = teamJoinCondition ? 'sovietTeam.players' : 'usaTeam.players';
          gameInfo = await Game.findOneAndUpdate(
            { roomId },
            { $push: { [joinTeam]: user?.id }, $pull: { [anotherTeam]: user?.id } },
            { new: true }
          ).populate(['sovietTeam.players', 'usaTeam.players']);
          socket.data.user!.isSovietTeam = !teamJoinCondition;
        } else {
          user = await User.findOneAndUpdate({ uid }, { $set: { captain: true } }, { new: true });
          socket.data.user!.captain = true;
          gameInfo = await (
            await Game.create({ roomId, sovietTeam: { players: [user?.id] } })
          ).populate(['sovietTeam.players', 'usaTeam.players']);
        }
        socket.join(roomId);
        done(roomId);
        if (user && gameInfo) {
          socket.broadcast.to(roomId).emit('ENTER_ROOM', gameInfo);
          io.to(socket.id).emit('INIT_DATA', gameInfo, user);
          logger.info(
            `✅ SUCCESS | ENTER_ROOM | roomId : ${roomId} | ${user.nickname} | ${user.uid} | to ${
              socket.data.user?.isSovietTeam ? 'soviet' : 'usa'
            }`
          );
        }
      } catch (error) {
        console.log(error);
        logger.error(
          `❌ FAIL | ENTER_ROOM | roomId : ${roomId} | ${userInfo.nickname} | ${userInfo.uid} `
        );
      }
    });

    socket.on('CHANGE_TEAM', async (userData, done) => {
      const { roomId, user } = socket.data;
      if (!user || typeof user.id !== 'string' || typeof roomId !== 'string') {
        return;
      }
      try {
        const game = await Game.findOne({ roomId });
        if (game) {
          const joinTeam = user.isSovietTeam ? 'usaTeam.players' : 'sovietTeam.players';
          const beforeTeam = user.isSovietTeam ? 'sovietTeam.players' : 'usaTeam.players';
          await game.updateOne({
            $push: { [joinTeam]: user.id },
            $pull: { [beforeTeam]: user.id },
          });
        }
        const gameInfo = await Game.findOne({ roomId }).populate([
          'sovietTeam.players',
          'usaTeam.players',
        ]);
        if (gameInfo) {
          user.isSovietTeam = !user.isSovietTeam;
          socket.broadcast.to(roomId).emit('CHANGE_TEAM', gameInfo);
          done(gameInfo);
          logger.info(
            `✅ SUCCESS | CHANGE_TEAM | roomId : ${roomId} | ${user.nickname} | ${user.uid} | to ${
              user.isSovietTeam ? 'soviet' : 'usa'
            }`
          );
        }
      } catch (error) {
        console.log(error);
        logger.error(
          `❌ FAIL | CHANGE_TEAM | roomId : ${roomId} | ${user.nickname} | ${user.uid} | to ${
            user.isSovietTeam ? 'soviet' : 'usa'
          }`
        );
      }
    });

    socket.on('SET_TIMER', async (gameTime) => {
      const { roomId, user } = socket.data;
      try {
        const game = await Game.findOne({ roomId });
        if (game) {
          await game.updateOne({ $set: { timer: gameTime } }, { new: true });
          logger.info(
            `✅ SUCCESS | SET_TIMER | roomId : ${roomId} | ${user?.nickname} | ${user?.uid}`
          );
        }
      } catch (error) {
        logger.error(
          `❌ FAIL | CHANGE_TEAM | roomId : ${roomId} | ${user?.nickname} | ${user?.uid}`
        );
      }
    });

    socket.on('GAME_START', async (done) => {
      const { roomId, user } = socket.data;
      if (typeof roomId !== 'string') {
        return;
      }
      try {
        const game = await Game.findOne({ roomId });
        if (game) {
          const randomWords = (await Word.aggregate([{ $sample: { size: 8 } }])).map(
            (word) => word.word
          );
          const answerCode = await Code.aggregate([{ $sample: { size: 1 } }]);
          const sovietWords = randomWords.slice(0, 4);
          const usaWords = randomWords.slice(4);
          const gameInfo = await Game.findOneAndUpdate(
            { roomId },
            {
              $set: {
                'isPlaying': true,
                'sovietTeam.words': sovietWords,
                'usaTeam.words': usaWords,
                'answerCode': answerCode[0].code,
              },
              $inc: { stageNumber: 1 },
            },
            { new: true }
          ).populate(['sovietTeam.players', 'usaTeam.players']);
          if (gameInfo) {
            socket.to(roomId).emit('GAME_START', gameInfo);
            done(gameInfo);
            logger.info(
              `✅ SUCCESS | GAME_START | roomId : ${roomId} | CAPTAIN : ${user?.nickname} | ${user?.uid}`
            );
          }
        }
      } catch (error) {
        logger.error(
          `❌ FAIL | GAME_START | roomId : ${roomId} | CAPTAIN : ${user?.nickname} | ${user?.uid}`
        );
      }
    });

    socket.on('SUBMIT_HINT', async (hints, done) => {
      const { roomId, user } = socket.data;
      if (typeof roomId !== 'string' || !user) {
        return;
      }
      const submitTeam = user.isSovietTeam ? 'sovietTeam.hints' : 'usaTeam.hints';
      try {
        const gameInfo = await Game.findOneAndUpdate(
          { roomId },
          { $inc: { stageNumber: 1 }, $push: { [submitTeam]: hints } },
          { new: true }
        ).populate(['sovietTeam.players', 'usaTeam.players']);
        if (gameInfo) {
          socket.to(roomId).emit('SUBMIT_HINT', gameInfo);
          done(gameInfo);
          logger.info(
            `✅ SUCCESS | SUBMIT_HINT | roomId : ${roomId} | ${user?.nickname} | ${user?.uid} | ${hints}`
          );
        }
      } catch (error) {
        logger.error(
          `❌ FAIL | SUBMIT_HINT | roomId : ${roomId} | ${user?.nickname} | ${user?.uid} | ${hints}`
        );
      }
    });

    socket.on('SUBMIT_CODE', async (codes) => {
      const { roomId, user } = socket.data;
      if (typeof roomId !== 'string' || !user) {
        return;
      }
      const submitTeam = user.isSovietTeam ? 'sovietTeam.codes' : 'usaTeam.codes';
      let gameInfo = await Game.findOne({ roomId });
      try {
        if (!gameInfo?.$isEmpty(submitTeam)) {
          return;
        }
        gameInfo = await Game.findOneAndUpdate(
          { roomId },
          { $set: { [submitTeam]: codes } },
          { new: true }
        ).populate(['sovietTeam.players', 'usaTeam.players']);
        if (gameInfo) {
          const tempStageNumber = gameInfo.stageNumber;
          const passCondition =
            !gameInfo.$isEmpty('sovietTeam.codes') && !gameInfo.$isEmpty('usaTeam.codes');
          if (!passCondition) {
            socket.to(roomId).emit('SUBMIT_CODE', gameInfo);
            io.to(socket.id).emit('SUBMIT_CODE', gameInfo);
            logger.info(
              `✅ SUCCESS | SUBMIT_CODE | roomId : ${roomId} | ${user?.nickname} | ${user?.uid} | ${
                user?.isSovietTeam ? 'soviet' : 'usa'
              } | ${codes}}`
            );
            return;
          }
          // 양 팀 모두 코드를 제출하여 passCondition 상황
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
          logger.info(
            `✅ SUCCESS | SUBMIT_HINT : PASS_CONDITION | roomId : ${roomId} | ${user?.nickname} | ${user?.uid}`
          );
          setTimeout(async () => {
            const answerCode = await Code.aggregate([{ $sample: { size: 1 } }]);
            gameInfo = await Game.findOneAndUpdate(
              { roomId },
              {
                $inc: {
                  'usaTeam.greenToken': usaInterrupt,
                  'usaTeam.redToken': usaWrong,
                  'sovietTeam.greenToken': sovietInterrupt,
                  'sovietTeam.redToken': sovietWrong,
                },
                $set: {
                  'stageNumber': tempStageNumber + 1,
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
              logger.info(
                `✅ SUCCESS | NEW_ROUND | roomId : ${roomId} | ${user?.nickname} | ${user?.uid}`
              );
            }
          }, 5000);
        }
      } catch (error) {
        logger.info(
          `❌ FAIL | SUBMIT_HINT | roomId : ${roomId} | ${user?.nickname} | ${user?.uid} | ${codes}`
        );
      }
    });

    socket.on('disconnecting', async () => {
      const { roomId, user } = socket.data;
      if (typeof roomId !== 'string' || !user) {
        return;
      }
      const numberOfClients = io.sockets.adapter.rooms.get(roomId as string)?.size;
      try {
        let game = await Game.findOne({ roomId });
        if (numberOfClients === 1) {
          await Game.deleteOne({ roomId });
          return;
        }
        const beforeLeavingTeam = user.isSovietTeam ? 'sovietTeam.players' : 'sovietTeam.players';
        game = await Game.findOneAndUpdate(
          { roomId },
          { $pull: { [beforeLeavingTeam]: user.id } },
          { new: true }
        );
        if (game) {
          const gameInfo = await game.populate(['sovietTeam.players', 'usaTeam.players']);
          socket.broadcast.to(roomId).emit('LEAVE_ROOM', gameInfo);
          logger.info(
            `✅ SUCCESS | NEW_ROUND | roomId : ${roomId} | ${user?.nickname} | ${user?.uid}`
          );
        }
      } catch (error) {
        logger.error(
          `❌ FAIL | DISCONNECTING | roomId : ${roomId} | ${user?.nickname} | ${user?.uid}`
        );
      }
    });
  };
};

export default handleSocket;
