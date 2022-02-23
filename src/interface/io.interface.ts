import mongoose, { Types } from 'mongoose';

interface IUser {
  userId: number;
  nickname: string;
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
  ENTER_ROOM: (
    userData: { nickname: string; roomId: string; uid: string },
    callback: (e: string) => void
  ) => void;

  CHANGE_TEAM: (uid: string, to: 'red' | 'blue', done: () => void) => void;

  GAME_START: (players: ITeam, done: (confirmTeam: ITeam) => void) => void;
}

// * 이벤트를 보낼 때
export interface ClientToServerEvents {
  USER_INFO: (userData?: {
    nickname: string;
    isOwner: boolean;
    uid: string;
    id: Types.ObjectId;
    isRedTeam: boolean;
  }) => void;
  ALREADY_START: () => void;
  ENTER_ROOM: (
    userData?: {
      nickname: string;
      isOwner: boolean;
      uid: string;
      id: Types.ObjectId;
      isRedTeam: boolean;
    },
    team?: string
  ) => void;
  CHANGE_TEAM: (
    userData?: {
      nickname: string;
      isOwner: boolean;
      uid: string;
      id: Types.ObjectId;
      isRedTeam: boolean;
    },
    to?: string
  ) => void;
  LEAVE_ROOM: (
    userData?: {
      nickname: string;
      isOwner: boolean;
      uid: string;
      id: Types.ObjectId;
      isRedTeam: boolean;
    },
    team?: string
  ) => void;
  GAME_START: (players: ITeam) => void;
  JOIN_USER: (userData: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  roomId: string;
  user: {
    nickname: string;
    isOwner: boolean;
    uid: string;
    id: Types.ObjectId;
    isRedTeam: boolean;
  };
}
