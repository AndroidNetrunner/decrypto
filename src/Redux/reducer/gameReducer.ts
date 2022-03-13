import { Reducer, AnyAction } from 'redux';
import { GameState } from '../../Interfaces/Game.interface';

/* 액션 타입 지정
 */
const ACTION = 'game/ACTION';
const BCTION = 'game/ACTION';
const CCTION = 'game/ACTION';
const DCTION = 'game/ACTION';

const actions = {
  ACTION,
} as const;
/* 액션 타입 생성?
})
*/

export const addToDo = (data: any) => ({
  type: ACTION,
  payload: data,
});

/*
action 타입의 타입 지정

*/

/*
상태의 타입 지정

*/

// 초기 상태값 지정
const initialState: GameState = {
  sovietTeam: {
    players: [],
    words: [],
    codes: [0, 0, 0],
    hints: [[]],
    greenToken: 0,
    redToken: 0,
  },
  americaTeam: {
    players: [],
    words: [],
    codes: [0, 0, 0],
    hints: [[]],
    greenToken: 0,
    redToken: 0,
  },
  captain: { uid: 'initialUID', nickname: 'Decrypto' },
  isPlaying: false,
  stage: -1,
  answerCode: [0, 0, 0],
  roomNumber: 0,
  timer: 30,
};

// 리듀서로 상태 변경
const gameReducer: Reducer = (state: GameState = initialState, action: AnyAction) => {
  switch (action.type) {
    case actions.ACTION:
      return state;
    default:
      return state;
  }
};

export default gameReducer;
