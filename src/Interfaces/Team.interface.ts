import User from './User.interface';

interface Team {
  words: string[];
  codes: number[];
  hints: string[][];
  leader: User;
  players: User[];
  greenToken: number;
  redToken: number;
}

export default Team;
