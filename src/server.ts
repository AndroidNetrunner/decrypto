import './env';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import session from 'express-session';
import cookieSession from 'cookie-session';
import cookeParser from 'cookie-parser';
import routes from './routes';

const app = express();
const logger = morgan('dev');

app.use(logger);
app.use(helmet());
app.use(
  cors({
    origin: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '*', // FIXME: 정확한 주소로 수정 필요
    credentials: true,
  })
);
app.use(cookeParser('Gamguma')); // FIXME: secretKey 로 수정 필요
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'Gamguma', // FIXME: secretKey 로 수정 필요
    resave: true,
    saveUninitialized: true,
  })
);

app.use('/', routes);

export default app;
