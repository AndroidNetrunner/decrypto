import { combineReducers, createStore } from 'redux';
import updateDBReducer from '../reducer/updateDB';
import updateUserReducer from '../reducer/updateUser';
import Game from '../../Interfaces/Game.interface';
import User from '../../Interfaces/User.interface';

interface rootReducer {
  game: Game;
  user: User;
}

const rootReducer = combineReducers<rootReducer>({ game: updateDBReducer, user: updateUserReducer });

const store = createStore(rootReducer);

export default store;
export type RootState = ReturnType<typeof rootReducer>;
