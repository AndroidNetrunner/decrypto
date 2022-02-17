import app from './server';

const PORT = process.env.PORT || 4040;

const handleListen = () => {
  console.log(`✅ http://localhost:${PORT}`);
};

app.listen(PORT, handleListen);
