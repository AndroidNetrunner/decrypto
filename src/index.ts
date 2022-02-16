import app from './server';

const handleListen = () => {
  console.log(`✅ http://localhost:${process.env.PORT}`);
};

app.listen(process.env.PORT, handleListen);
