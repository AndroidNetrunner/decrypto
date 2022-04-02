import mongoose from 'mongoose';

export default interface User {
  _id: mongoose.Types.ObjectId;
  nickname: string;
  uid: string;
  captain: boolean;
}
