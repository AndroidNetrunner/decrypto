import { combineReducers, createStore, Reducer } from 'redux';
import gameReducer from '../reducer/gameReducer';
import roomReducer from '../reducer/roomReducer';
import userReducer from '../reducer/userReducer';

const rootReducer = combineReducers({ game: gameReducer, room: roomReducer, user: userReducer });

const store = createStore(rootReducer);

export default store;
export type RootState = ReturnType<typeof rootReducer>;
