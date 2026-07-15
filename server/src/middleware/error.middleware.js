import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

export function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        code: err.code,
        ...(err.details && { details: err.details }),
      },
    });
  }

  if (err.name === 'ValidationError') {
    const details = Object.values(err.errors).map(e => ({
      field: e.path,
      message: e.message,
    }));
    return res.status(400).json({
      success: false,
      error: { message: 'Validation error', code: 'VALIDATION_ERROR', details },
    });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      success: false,
      error: {
        message: `${field} already exists`,
        code: 'DUPLICATE_KEY',
        details: [{ field, message: `This ${field} is already in use` }],
      },
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: { message: 'Invalid ID format', code: 'CAST_ERROR' },
    });
  }

  console.error('Unhandled error:', err);

  return res.status(500).json({
    success: false,
    error: {
      message: env.isDev ? err.message : 'Internal server error',
      code: 'INTERNAL_ERROR',
    },
  });
}
