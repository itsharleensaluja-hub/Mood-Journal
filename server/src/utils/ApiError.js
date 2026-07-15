export class ApiError extends Error {
  constructor(statusCode, message, code = 'INTERNAL_ERROR', details = null) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.isOperational = true;
  }

  static badRequest(message, details) {
    return new ApiError(400, message, 'BAD_REQUEST', details);
  }

  static unauthorized(message = 'Unauthorized') {
    return new ApiError(401, message, 'UNAUTHORIZED');
  }

  static forbidden(message = 'Forbidden') {
    return new ApiError(403, message, 'FORBIDDEN');
  }

  static notFound(message = 'Resource not found') {
    return new ApiError(404, message, 'NOT_FOUND');
  }

  static conflict(message) {
    return new ApiError(409, message, 'CONFLICT');
  }

  static tooMany(message = 'Too many requests') {
    return new ApiError(429, message, 'RATE_LIMIT');
  }
}
