import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.middleware.js';
import { authenticate } from '../middleware/auth.middleware.js';
import * as aiController from '../controllers/ai.controller.js';

const router = Router();

const reflectSchema = z.object({
  text: z.string().max(10000).default(''),
  moodId: z.enum(['happy', 'calm', 'neutral', 'sad', 'angry', 'anxious', 'excited']).optional(),
});

router.use(authenticate);

router.post('/reflect', validate(reflectSchema), aiController.reflect);

export default router;
