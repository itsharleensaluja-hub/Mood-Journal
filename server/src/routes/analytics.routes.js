import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import * as analyticsController from '../controllers/analytics.controller.js';

const router = Router();

router.use(authenticate);

router.get('/all', analyticsController.getAll);
router.get('/stats', analyticsController.getStats);
router.get('/weekly', analyticsController.getWeekly);
router.get('/distribution', analyticsController.getDistribution);
router.get('/top-moods', analyticsController.getTopMoods);
router.get('/monthly', analyticsController.getMonthly);

export default router;
