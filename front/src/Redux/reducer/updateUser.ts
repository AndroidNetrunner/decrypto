import { Reducer } from 'redux';
import User from '../../Interfaces/User.interface';

// 액션 타입 지정
const UPDATE_USER = 'room/UPDATE_USER';

const actions = {
  UPDATE_USER,
} as const;

// Action Type
interface Action<T, P> {
  readonly type: T;
  readonly payload?: P;
}

// 액션 타입
type updateUserAction = Action<typeof UPDATE_USER, User>;

type Actions = updateUserAction;

// Action Creator
export const updateUser = (userInfo: User): updateUserAction => {
  return {
    type: UPDATE_USER,
    payload: userInfo,
  };
};

const initialUser: User = {
  _id: 'initial_id',
  uid: 'initialUid',
  nickname: 'initialNickname',
  captain: false,
};

// 리듀서로 상태 변경
const userReducer: Reducer = (state: User = initialUser, action: Actions) => {
  if (!action.payload) {
    return state;
  }
  switch (action.type) {
    case actions.UPDATE_USER: {
      const newUser = action.payload;
      return newUser;
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
