import mongoose from 'mongoose';

interface Team {
  words: string[];
  codes: number[];
  hints: string[][];
  players: mongoose.Types.ObjectId[];
  greenToken: number;
  redToken: number;
}

export default interface Game {
  roomId: string;
  isPlaying: boolean;
  captain: mongoose.Types.ObjectId;
  stageNumber: number;
  answerCode: number[];
  timer: number;
  sovietTeam: Team;
  usaTeam: Team;
}
