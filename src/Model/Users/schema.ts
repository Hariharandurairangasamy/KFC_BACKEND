import mongoose from 'mongoose';
import { UserInterface } from 'Interface/UserInterface';

const user = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      require: true,
    },
    permission: [String],
  },
  { timestamps: true }
);

export default mongoose.model<UserInterface>('user', user);
