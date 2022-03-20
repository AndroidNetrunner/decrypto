import { Reducer } from 'redux';
import Game from '../../Interfaces/Game.interface';
import User from '../../Interfaces/User.interface';
import Team from '../../Interfaces/Team.interface';

// 액션 타입 지정
const UPDATE_DB = 'room/UPDATE_DB';

const actions = {
  UPDATE_DB,
} as const;

// Action Type
interface Action<T, P> {
  readonly type: T;
  readonly payload?: P;
}

// 액션 타입
type updateDBAction = Action<typeof UPDATE_DB, Game>;

type Actions = updateDBAction;

// Action Creator
export const updateDB = (gameInfo: Game): updateDBAction => {
  return {
    type: UPDATE_DB,
    payload: gameInfo,
  };
};

// Initial State
const initialUser: User = {
  _id: 'initial_id',
  uid: 'initialUid',
  nickname: 'initialNickname',
  captain: false,
  isSovietTeam: true,
};

const initialTeam: Team = {
  leader: initialUser,
  players: [initialUser],
  words: ['word1', 'word2', 'word3', 'word4'],
  codes: [1, 2, 3],
  hints: [
    ['hint1', '', 'hint2', 'hint3'],
    ['hint4', 'hint5', '', 'hint6'],
  ],
  greenToken: 0,
  redToken: 0,
};

const initialGame: Game = {
  roomId: '3',
  isPlaying: false,
  captain: initialUser,
  stageNumber: -1,
  answerCode: [1, 3, 4],
  timer: 30,
  sovietTeam: initialTeam,
  usaTeam: initialTeam,
};

// 리듀서로 상태 변경
const updateDBReducer: Reducer = (state: Game = initialGame, action: Actions) => {
  if (!action.payload) {
    return state;
  }
  switch (action.type) {
    case actions.UPDATE_DB: {
      const newDB = action.payload;
      return newDB;
    }
    default: {
      return state;
    }
  }
};

export default updateDBReducer;
