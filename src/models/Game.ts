import mongoose from 'mongoose';
import GameInterface from '../interface/game.interface';

const gameSchema = new mongoose.Schema({
  roomId: { type: String, unique: true, required: true },
  isPlaying: { type: Boolean, default: false },
  captain: { type: mongoose.Types.ObjectId, ref: 'User' },
  stageNumber: { type: Number, default: -1 },
  answerCode: { type: Array, default: [] },
  roomNumber: { type: Number },
  timer: { type: Number, default: 30 },
  sovietTeam: {
    words: { type: Array, default: [] },
    hints: { type: Array, default: [] },
    codes: { type: Array, default: [] },
    greenToken: { type: Number, default: 0 },
    redToken: { type: Number, default: 0 },
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  usaTeam: {
    words: { type: Array, default: [] },
    hints: { type: Array, default: [] },
    codes: { type: Array, default: [] },
    greenToken: { type: Number, default: 0 },
    redToken: { type: Number, default: 0 },
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
});

const Game = mongoose.model<GameInterface>('Game', gameSchema);

export default Game;
