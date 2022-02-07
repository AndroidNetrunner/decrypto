import app from './server';

const handleListen = () => {
  console.log(`✅ http://localhost:${process.env.SERVER_PORT}`);
};

app.listen(4000, handleListen);
