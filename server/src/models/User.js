import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { AVATAR_OPTIONS } from '../utils/constants.js';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name must be at most 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false,
  },
  avatar: {
    type: String,
    enum: {
      values: AVATAR_OPTIONS,
      message: 'Avatar must be one of: ' + AVATAR_OPTIONS.join(', '),
    },
    default: 'ink',
  },
  theme: {
    type: String,
    enum: ['light', 'dark'],
    default: 'light',
  },
  lastMood: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      delete ret.password;
      delete ret.__v;
      return ret;
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model('User', userSchema);
