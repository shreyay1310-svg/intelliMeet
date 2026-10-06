import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: 'employee' | 'admin';
  avatar: string;
  organization: string;
  team: string;
  jobTitle: string;
  status: 'active' | 'inactive';
  preferences: {
    defaultMeetingDuration: number;
    cameraDefault: boolean;
    microphoneDefault: boolean;
    meetingReminders: boolean;
    taskNotifications: boolean;
    mentions: boolean;
    aiSummaryNotifications: boolean;
  };
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: ['employee', 'admin'],
      default: 'employee',
    },
    avatar: {
      type: String,
      default: '',
    },
    organization: {
      type: String,
      default: 'Zidio Development',
    },
    team: {
      type: String,
      default: 'Product Team',
    },
    jobTitle: {
      type: String,
      default: 'Product Specialist',
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    preferences: {
      defaultMeetingDuration: { type: Number, default: 30 },
      cameraDefault: { type: Boolean, default: true },
      microphoneDefault: { type: Boolean, default: true },
      meetingReminders: { type: Boolean, default: true },
      taskNotifications: { type: Boolean, default: true },
      mentions: { type: Boolean, default: true },
      aiSummaryNotifications: { type: Boolean, default: true },
    },
    refreshToken: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to verify password
userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema);
