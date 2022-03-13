import { Reducer, AnyAction } from 'redux';
import User from '../../Interfaces/User.interface';

// 액션 타입 지정
const ENTER_ROOM = 'user/ENTER_ROOM';

const actions = {
  ENTER_ROOM,
} as const;

// Action Creator
export const enterRoom = (payload: any) => ({
  type: ENTER_ROOM,
  payload,
});

// Initial State
const initialState: User = {
  uid: 'InitialUID',
  nickname: 'Decrypto',
};

// 리듀서로 상태 변경
const userReducer: Reducer = (state: User = initialState, action: AnyAction) => {
  switch (action.type) {
    case actions.ENTER_ROOM:
      return state;
    case actions.LEAVE_ROOM:
      return state;
    case actions.CHANGE_TEAM:
      return state;
    case actions.CHANGE_TIMER:
      return state;
    default:
      return state;
  }
};

export default userReducer;

// 1. ENTER_ROOM
// 2. CHANGE_TEAM (SERVER_CHANGE_TEAM, CLIENT_CHANGE_TEAM)
// 3. LEAVE_ROOM
// 4. GAME_START
// 5. CHANGE_TIMER
