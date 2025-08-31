import mongoose, { Document, Model } from "mongoose";

// Define the interface for a user document
export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  elo: number;
  bio: string;
  isAdmin: boolean;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
}

const userSchema = new mongoose.Schema<UserDocument>({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  elo: {
    type: Number,
    default: 1000,
  },
  bio: {
    type: String,
    default: "Write your bio...",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

// Proper typing for mongoose model
const User: Model<UserDocument> =
  mongoose.models.users || mongoose.model<UserDocument>("users", userSchema);

export default User;
