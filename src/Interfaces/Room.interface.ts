import User from './User.interface';

export default interface RoomState {
  sovietTeam: {
    players: User[];
  };
  americaTeam: {
    players: User[];
  };
  captain: { uid: string; nickname: string };
  timer: number;
  roomNumber: number;
}
