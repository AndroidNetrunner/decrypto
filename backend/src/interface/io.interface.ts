import { Types } from 'mongoose';
import GameInterface from './game.interface';
import UserInterface from './user.interface';

// * 이벤트를 받을 때
export interface ServerToClientEvents {
  ENTER_ROOM: (
    userData: { nickname: string; roomId: string; uid: string },
    callback: (e: string) => void
  ) => void;
  CHANGE_TEAM: (userData: UserInterface, done: (gameData: GameInterface) => void) => void;
  SET_TIMER: (gameTime: number) => void;
  GAME_START: (done: (gameData: GameInterface) => void) => void;
  SUBMIT_HINT: (hints: [string, string, string], done: (gameData: GameInterface) => void) => void;
  SUBMIT_CODE: (codes: [number, number, number]) => void;
}

// * 이벤트를 보낼 때
export interface ClientToServerEvents {
  ALREADY_START: () => void;
  ENTER_ROOM: (gameData: GameInterface) => void;
  CHANGE_TEAM: (gameData: GameInterface) => void;
  LEAVE_ROOM: (gameData: GameInterface) => void;
  INIT_DATA: (gameData: GameInterface, userData: UserInterface) => void;
  SET_TIMER: (gameData: GameInterface) => void;
  GAME_START: (gameData: GameInterface) => void;
  SUBMIT_HINT: (gameData: GameInterface) => void;
  SUBMIT_CODE: (gameData: GameInterface) => void;
  SHOW_RESULT: (gameData: GameInterface) => void;
  NEW_ROUND: (gameData: GameInterface) => void;
  END_GAME: (gameData: GameInterface) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  roomId: string;
  user: {
    nickname: string;
    captain: boolean;
    uid: string;
    id: Types.ObjectId;
    isSovietTeam: boolean;
  };
}
