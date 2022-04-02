import './env';
import './db';
import './interface/@types/session';
import httpServer from './server';

const PORT = process.env.PORT || 4040;

const handleListen = () => {
  console.log(`✅ http://localhost:${PORT}`);
};

httpServer.listen(PORT, handleListen);
