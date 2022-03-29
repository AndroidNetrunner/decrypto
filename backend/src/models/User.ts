import mongoose from 'mongoose';
import UserInterface from '../interface/user.interface';

const userSchema = new mongoose.Schema({
  uid: { type: String, require: true, unique: true },
  nickname: { type: String, required: true },
  captain: { type: Boolean, default: false },
});

const User = mongoose.model<UserInterface>('User', userSchema);
export default User;
