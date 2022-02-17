import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  avatarUrl: String,
  socialOnly: { type: Boolean, default: false },
  nickname: { type: String, required: true },
  password: { type: String },
});

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model('User', userSchema);
export default User;
