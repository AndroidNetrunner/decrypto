import User from './User.interface';
import Game from './Game.interface';

// TODO: interface 정리 필요

// * 이벤트를 받을 때
export interface ServerToClientEvents {
  ENTER_ROOM: (gameInfo: Game) => void;
  CHANGE_TEAM: (gameInfo: Game) => void;
  LEAVE_ROOM: (gameInfo: Game) => void;
  GAME_START: (gameInfo: Game) => void;
  INIT_DATA: (gameInfo: Game, userData: User) => void;
  SUBMIT_HINT: (gameInfo: Game) => void;
  SUBMIT_CODE: (gameInfo: Game) => void;
  NEW_ROUND: (gameInfo: Game) => void;
  SHOW_RESULT: (gameInfo: Game) => void;
  END_GAME: (gameInfo: Game) => void;
}

// * 이벤트를 보낼 때
export interface ClientToServerEvents {
  SET_TIMER: (gameTime: number) => void;
  CHANGE_TEAM: (userData: User, done: (gameInfo: Game, userInfo: User) => void) => void;
  ENTER_ROOM: (
    userData: { nickname: string; roomId: string; uid: string },
    done: (confirmRoomId: string) => void,
  ) => void;
  GAME_START: (done: (gameInfo: Game) => void) => void;
  SUBMIT_HINT: (hints: [string, string, string, string], done: (gameInfo: Game) => void) => void;
  SUBMIT_CODE: (code: [number, number, number], done: (gameInfo: Game) => void) => void;
}
