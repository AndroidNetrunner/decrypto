import User from './User.interface';

export interface Team {
  players: User[];
  words: string[];
  codes: [number, number, number];
  hints: string[][];
  greenToken: 0 | 1 | 2;
  redToken: 0 | 1 | 2;
}
