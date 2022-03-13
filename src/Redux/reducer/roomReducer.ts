import { Reducer } from 'redux';
import RoomState from '../../Interfaces/Room.interface';
import User from '../../Interfaces/User.interface';

type team = 'sovietTeam' | 'americaTeam';

// 액션 타입 지정
const ENTER_ROOM = 'room/ENTER_ROOM';
const LEAVE_ROOM = 'room/LEAVE_ROOM';
const CHANGE_TEAM = 'room/CHANGE_TEAM';
const CHANGE_TIMER = 'room/CHANGE_TIMER';

const actions = {
  ENTER_ROOM,
  LEAVE_ROOM,
  CHANGE_TEAM,
  CHANGE_TIMER,
} as const;

// Action Type
interface Action<T, P> {
  readonly type: T;
  readonly payload?: P;
}

// 액션 타입
type enterRoomAction = Action<typeof ENTER_ROOM, { user: User; to: team }>;
type changeTeamAction = Action<typeof CHANGE_TEAM, { user: User; to: team }>;
type leaveRoomAction = Action<typeof LEAVE_ROOM, { user: User; from: team }>;
type changeTimerAction = Action<typeof CHANGE_TIMER, number>;

type Actions = enterRoomAction | changeTeamAction | leaveRoomAction | changeTimerAction;

// Action Creator
export const enterRoom = (user: User, to: team): enterRoomAction => {
  return {
    type: ENTER_ROOM,
    payload: { user, to },
  };
};

export const changeTeam = (user: User, to: team): changeTeamAction => ({
  type: CHANGE_TEAM,
  payload: { user, to },
});

export const leaveRoom = (user: User, from: team): leaveRoomAction => ({
  type: LEAVE_ROOM,
  payload: { user, from },
});

export const changeTimer = (payload: number): changeTimerAction => ({
  type: CHANGE_TIMER,
  payload,
});

// Initial State
const initialState: RoomState = {
  sovietTeam: {
    players: [],
  },
  americaTeam: {
    players: [],
  },
  captain: { uid: '', nickname: '' },
  roomNumber: 1,
  timer: 30,
};

// 리듀서로 상태 변경
const roomReducer: Reducer = (state: RoomState = initialState, action: Actions) => {
  if (!action.payload) {
    return state;
  }
  switch (action.type) {
    case actions.ENTER_ROOM: {
      const newTeam = [...state[action.payload.to].players, action.payload.user];
      return { ...state, [action.payload.to]: newTeam };
    }
    case actions.LEAVE_ROOM: {
      const newTeam = state[action.payload.from].players.filter(
        (user: User) => user.uid !== action.payload?.user.uid,
      );
      return { ...state, [action.payload.from]: newTeam };
    }
    case actions.CHANGE_TEAM: {
      return state;
    }
    case actions.CHANGE_TIMER: {
      return { ...state, timer: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default roomReducer;

// 1. ENTER_ROOM
// 2. CHANGE_TEAM (SERVER_CHANGE_TEAM, CLIENT_CHANGE_TEAM)
// 3. LEAVE_ROOM
// 4. GAME_START
// 5. CHANGE_TIMER
