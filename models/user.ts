import mongoose, { Schema, Document } from "mongoose";
import { isEmail } from "validator";

export const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [8, "Minimum password length is 8 characters"],
  },
  balance: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  deleted_at: {
    type: Date || null,
    default: null,
  },
});

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  balance: number;
  created_at: Date;
  deleted_at: Date;
}

export default mongoose.model<IUser>("User", userSchema);