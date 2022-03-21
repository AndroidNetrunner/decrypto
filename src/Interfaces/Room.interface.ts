import User from './User.interface';

export default interface RoomState {
  sovietTeam: {
    players: User[];
  };
  usaTeam: {
    players: User[];
  };
  captain: { uid: string; nickname: string };
  timer: number;
  roomNumber: number;
}
