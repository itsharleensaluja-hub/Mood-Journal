import { ApiError } from '../utils/ApiError.js';

export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const details = result.error.errors.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      }));
      throw ApiError.badRequest('Validation failed', details);
    }
    req.validatedBody = result.data;
    next();
  };
}
