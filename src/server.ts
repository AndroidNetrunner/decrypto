import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
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
    origin: true, // FIXME: 정확한 주소로 수정 필요
    credentials: true,
  })
);
app.use(cookeParser(process.env.COOKIE_SECRET as string));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

io.of(process.env.NODE_ENV === 'development' ? '/api/game' : '/game').on(
  'connection',
  handleSocket(io)
);

export default httpServer;
