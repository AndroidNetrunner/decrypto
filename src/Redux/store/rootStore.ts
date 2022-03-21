import { combineReducers, createStore } from 'redux';
import updateDBReducer from '../reducer/updateDB';
import updateUserReducer from '../reducer/updateUser';

const rootReducer = combineReducers({ game: updateDBReducer, user: updateUserReducer });

const store = createStore(rootReducer);

export default store;
export type RootState = ReturnType<typeof rootReducer>;
