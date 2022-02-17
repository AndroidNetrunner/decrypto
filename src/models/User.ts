import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import UserType from '../interface/user.interface';

const userSchema = new mongoose.Schema<UserType>({
  email: { type: String, required: true },
  avatarUrl: String,
  socialOnly: { type: Boolean, default: false },
  nickname: { type: String, required: true },
  password: { type: String },
});

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model<UserType>('User', userSchema);
export default User;
