import mongoose from 'mongoose';

const connectionString = `mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}:27017/Decrypto`;

mongoose.connect(connectionString);

const db = mongoose.connection;

const handleError = (error: string) => console.log('🚫 DB Error : ', error);
const handleOpen = () => console.log('🚀 DB Connection');

db.on('error', handleError);
db.once('open', handleOpen);
