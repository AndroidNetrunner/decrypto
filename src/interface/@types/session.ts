import session from 'express-session';
import IUser from '../user.interface';

declare module 'express-session' {
  export interface SessionData {
    loggedIn: boolean;
    user: IUser;
  }
}
