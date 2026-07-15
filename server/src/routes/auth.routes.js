import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.middleware.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { authLimiter } from '../middleware/rateLimit.middleware.js';
import * as authController from '../controllers/auth.controller.js';

const router = Router();

const registerSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Please provide a valid email').toLowerCase().trim(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const loginSchema = z.object({
  email: z.string().email('Please provide a valid email').toLowerCase().trim(),
  password: z.string().min(1, 'Password is required'),
});

const updateSchema = z.object({
  name: z.string().trim().min(2).max(50).optional(),
  avatar: z.enum(['ink', 'plum', 'herb', 'clay', 'brass', 'paper']).optional(),
  theme: z.enum(['light', 'dark']).optional(),
  lastMood: z.string().nullable().optional(),
});

const deleteSchema = z.object({
  password: z.string().min(1, 'Password is required'),
});

router.post('/register', authLimiter, validate(registerSchema), authController.register);
router.post('/login', authLimiter, validate(loginSchema), authController.login);
router.post('/logout', authenticate, authController.logout);
router.get('/me', authenticate, authController.getMe);
router.patch('/me', authenticate, validate(updateSchema), authController.updateMe);
router.delete('/me', authenticate, validate(deleteSchema), authController.deleteMe);

export default router;
