import mongoose from "mongoose";
import { RoleDocument } from "./role.js";

interface UserDocument extends Document {
  email: string;
  username: string;
  password: string;
  role: mongoose.Types.ObjectId | RoleDocument;
}

const userSchema = new mongoose.Schema<UserDocument>({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/
  },
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: 20,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
  },
  
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required:true }
});

const User = mongoose.model<UserDocument>("User", userSchema);
export default User;