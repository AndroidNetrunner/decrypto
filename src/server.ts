import './env';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieSession from 'cookie-session';
import userRouter from './routers/apiRouter';
import globalRouter from './routers/globalRouter';

const app = express();
const logger = morgan('dev');

app.use(logger);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: 'bezkoder-session',
    secret: 'COOKIE_SECRET',
    httpOnly: true,
  })
);

app.use('/', globalRouter);
app.use('/', userRouter);

export default app;
