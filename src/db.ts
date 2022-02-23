import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_DB_URL as string);
const db = mongoose.connection;

const handleError = (error: string) => console.log('🚫 DB Error : ', error);
const handleOpen = () => console.log('🚀 DB Connection');

db.on('error', handleError);
db.once('open', handleOpen);
