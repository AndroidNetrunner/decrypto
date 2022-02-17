import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/');
const db = mongoose.connection;

const handleError = (error: string) => console.log('🚫 DB Error : ', error);
const handleOpen = () => console.log('🚀 DB Connection');

db.on('error', handleError);
db.once('open', handleOpen);
