import { io, Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from '../Interfaces/io.interface';

const BACKEND_BASE_URL = import.meta.env.REACT_APP_BACKEND_BASE_URL;

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  import.meta.env.DEV ? `${BACKEND_BASE_URL}/api` : `/api`,
  {
    autoConnect: false,
    transports: ['websocket'],
  },
);

export default socket;
