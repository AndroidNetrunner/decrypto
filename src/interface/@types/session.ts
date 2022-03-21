import session from 'express-session';
import UserInterface from '../user.interface';

declare module 'express-session' {
  export interface SessionData {
    loggedIn: boolean;
    user: UserInterface;
    gitHubToken: string;
  }
}
