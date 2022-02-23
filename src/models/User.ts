import mongoose from 'mongoose';
import UserType from '../interface/user.interface';

const userSchema = new mongoose.Schema({
  uid: { type: String, require: true, unique: true },
  nickname: { type: String, required: true },
  isOwner: { type: Boolean, default: false },
});

const User = mongoose.model<UserType>('User', userSchema);
export default User;
