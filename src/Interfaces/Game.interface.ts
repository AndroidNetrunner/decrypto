import User from './User.interface';
import { Team } from './Team.interface';

export interface GameState {
  sovietTeam: Team;
  usaTeam: Team;
  captain: User;
  isPlaying: boolean;
  stage: number;
  answerCode: [number, number, number];
  roomNumber: number;
  timer: number;
}
