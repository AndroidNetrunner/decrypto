interface IUser {
  nickname: string;
  uuid: string;
  isOwner: boolean;
  _id: string;
}
interface ITeam {
  firstTeam: {
    users: IUser[];
  };
  secondTeam: {
    users: IUser[];
  };
}

// * 이벤트를 받을 때
export interface ServerToClientEvents {
  ENTER_ROOM: (userData: { nickname: string; uuid: string; isOwner: boolean; _id: string }) => void;
  LEAVE_ROOM: (uuid: string) => void;
  GAME_START: (players: ITeam) => void;
}

// * 이벤트를 보낼 때
export interface ClientToServerEvents {
  ENTER_ROOM: (
    userData: { nickname: string; roomId: string; uuid: string },
    done: (confirmRoomId: string) => void,
  ) => void;

  GAME_START: (team: ITeam, done: (confirmTeam: ITeam) => void) => void;
}
