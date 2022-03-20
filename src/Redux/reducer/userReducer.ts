import { Reducer, AnyAction } from 'redux';
import User from '../../Interfaces/User.interface';

// 액션 타입 지정
const ENTER_ROOM = 'user/ENTER_ROOM';

const actions = {
  ENTER_ROOM,
} as const;

interface Action<T, P> {
  readonly type: T;
  readonly payload?: P;
}

type enterRoomAction = Action<typeof ENTER_ROOM, User>;

// Action Creator
export const userEnter = (userInfo: User): enterRoomAction => {
  return {
    type: ENTER_ROOM,
    payload: userInfo,
  };
};

// Initial State
const initialState: User = {
  _id: 'initial_id',
  uid: 'initial_uid',
  nickname: 'initial_nickname',
  isOwner: false,
  isSovietTeam: false,
};

// 리듀서로 상태 변경
const userReducer: Reducer = (state: User = initialState, action: AnyAction) => {
  switch (action.type) {
    case actions.ENTER_ROOM: {
      const newUser = action.payload;
      return newUser;
    }
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
