import User from './User.interface';
import Team from './Team.interface';

export default interface Game {
  roomId: string;
  isPlaying: boolean;
  captain: User;
  stageNumber: number;
  answerCode: number[];
  timer: number;
  sovietTeam: Team;
  usaTeam: Team;
}
