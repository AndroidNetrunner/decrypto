import { ITeam, User } from '../Pages/Room';

// TODO: interface 정리 필요

type TeamList = 'soviet' | 'usa';

// * 이벤트를 받을 때
export interface ServerToClientEvents {
  ENTER_ROOM: (userData: User, team: TeamList) => void;
  CHANGE_TEAM: (userData: User, to: TeamList) => void;
  LEAVE_ROOM: (userData: User, team: TeamList) => void;
  GAME_START: (players: ITeam) => void;
  INIT_DATA: (gameInfo, userData) => void;
}

// * 이벤트를 보낼 때
export interface ClientToServerEvents {
  CHANGE_TEAM: (uid: string, to: TeamList, done: () => void) => void;
  ENTER_ROOM: (
    userData: { nickname: string; roomId: string; uid: string },
    done: (confirmRoomId: string) => void,
  ) => void;
  GAME_START: (team: ITeam, done: (confirmTeam: ITeam) => void) => void;
}
