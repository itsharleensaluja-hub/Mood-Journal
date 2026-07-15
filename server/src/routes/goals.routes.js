import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.middleware.js';
import { authenticate } from '../middleware/auth.middleware.js';
import * as goalsController from '../controllers/goals.controller.js';

const router = Router();

const setGoalSchema = z.object({
  text: z.string().trim().min(1, 'Goal text is required').max(500),
});

router.use(authenticate);

router.get('/today', goalsController.getTodayGoal);
router.put('/today', validate(setGoalSchema), goalsController.setTodayGoal);

export default router;
