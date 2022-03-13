import mongoose from 'mongoose';

type Team = {
  words: string[];
  codes: string[][];
  hints: string[][];
  leader: mongoose.Types.ObjectId;
  users: mongoose.Types.ObjectId[];
  greenToken: number;
  redToken: number;
};

export interface IGame {
  roomId: string;
  isPlaying: boolean;
  captain: mongoose.Types.ObjectId;
  stageNumber: number;
  answerCode: number[];
  roomNumber: number;
  timer: number;
  sovietTeam: Team;
  usaTeam: Team;
}

const gameSchema = new mongoose.Schema({
  roomId: { type: String, unique: true, required: true },
  isPlaying: { type: Boolean, default: false },
  captain: { type: mongoose.Types.ObjectId, ref: 'User' },
  stageNumber: { type: Number },
  answerCode: [],
  roomNumber: { type: Number },
  timer: { type: Number },
  sovietTeam: {
    words: [],
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  usaTeam: {
    words: [],
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
});

const Game = mongoose.model<IGame>('Game', gameSchema);

export default Game;
