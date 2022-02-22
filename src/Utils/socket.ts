import { io, Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from '../Interfaces/io.interface';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  import.meta.env.REACT_APP_BACKEND_BASE_URL,
);

export default socket;
