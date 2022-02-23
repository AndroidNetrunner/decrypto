import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import mongoStore from 'connect-mongo';
import session from 'express-session';
import cookeParser from 'cookie-parser';
import routes from './routes';
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from './interface/io.interface';
import handleSocket from './socket';

const app = express();
const logger = morgan('dev');

app.use(logger);
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL, // FIXME: 정확한 주소로 수정 필요
    credentials: true,
  })
);
app.use(cookeParser(process.env.COOKIE_SECRET as string)); // FIXME: secretKey 로 수정 필요
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.COOKIE_SECRET as string, // FIXME: secretKey 로 수정 필요
    resave: false,
    cookie: { httpOnly: true },
    saveUninitialized: false,
    store: mongoStore.create({ mongoUrl: process.env.MONGO_DB_URL }),
  })
);

app.use('/', routes);

const httpServer = http.createServer(app);
const io = new Server<ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData>(
  httpServer,
  {
    cors: {
      origin: true,
      credentials: true,
    },
  }
);

io.on('connection', handleSocket(io));

instrument(io, { auth: false });

export default httpServer;
