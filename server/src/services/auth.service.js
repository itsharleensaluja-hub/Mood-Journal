import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { User } from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';

function generateToken(userId) {
  return jwt.sign({ userId }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
}

export async function registerUser({ name, email, password }) {
  const existing = await User.findOne({ email });
  if (existing) {
    throw ApiError.conflict('An account with this email already exists');
  }

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);

  return { user: user.toJSON(), token };
}

export async function loginUser({ email, password }) {
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  const token = generateToken(user._id);
  return { user: user.toJSON(), token };
}

export async function getUserProfile(userId) {
  const user = await User.findById(userId);
  if (!user) {
    throw ApiError.notFound('User not found');
  }
  return user;
}

export async function updateUserProfile(userId, updates) {
  const allowed = ['name', 'avatar', 'theme', 'lastMood'];
  const filtered = {};
  for (const key of allowed) {
    if (updates[key] !== undefined) {
      filtered[key] = updates[key];
    }
  }

  const user = await User.findByIdAndUpdate(userId, filtered, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw ApiError.notFound('User not found');
  }

  return user;
}

export async function deleteUserAccount(userId, password) {
  const user = await User.findById(userId).select('+password');
  if (!user) {
    throw ApiError.notFound('User not found');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw ApiError.unauthorized('Invalid password');
  }

  await Promise.all([
    User.findByIdAndDelete(userId),
    (await import('../models/Entry.js')).Entry.deleteMany({ userId }),
    (await import('../models/Goal.js')).Goal.deleteMany({ userId }),
  ]);

  return { message: 'Account deleted successfully' };
}
