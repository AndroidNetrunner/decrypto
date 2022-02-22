import { ITeam, User } from '../Pages/Room';

type TeamList = 'red' | 'blue';

// * 이벤트를 받을 때
export interface ServerToClientEvents {
  // TODO: 타입 겹치니 리팩토링 필요
  ENTER_ROOM: (userData: User, team: TeamList) => void;
  CHANGE_TEAM: (userData: User, to: TeamList) => void;
  LEAVE_ROOM: (userData: User, team: TeamList) => void;
  GAME_START: (players: ITeam) => void;
}

// * 이벤트를 보낼 때
export interface ClientToServerEvents {
  CHANGE_TEAM: (uid: string, to: 'red' | 'blue', done: () => void) => void;

  ENTER_ROOM: (
    userData: { nickname: string; roomId: string; uid: string },
    done: (confirmRoomId: string) => void,
  ) => void;

  GAME_START: (team: ITeam, done: (confirmTeam: ITeam) => void) => void;
}
