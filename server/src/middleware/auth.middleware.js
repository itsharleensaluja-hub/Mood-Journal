import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/User.js';

export async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw ApiError.unauthorized('No token provided');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, env.jwtSecret);

    const user = await User.findById(decoded.userId);
    if (!user) {
      throw ApiError.unauthorized('User no longer exists');
    }

    req.user = user;
    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return next(ApiError.unauthorized('Invalid or expired token'));
    }
    if (err instanceof jwt.TokenExpiredError) {
      return next(ApiError.unauthorized('Token expired'));
    }
    next(err);
  }
}
