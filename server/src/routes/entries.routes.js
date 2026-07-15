import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.middleware.js';
import { authenticate } from '../middleware/auth.middleware.js';
import * as entriesController from '../controllers/entries.controller.js';

const router = Router();

const createSchema = z.object({
  moodId: z.enum(['happy', 'calm', 'neutral', 'sad', 'angry', 'anxious', 'excited']),
  note: z.string().max(10000).default(''),
  imageUrl: z.string().url().nullable().optional(),
});

const updateSchema = z.object({
  moodId: z.enum(['happy', 'calm', 'neutral', 'sad', 'angry', 'anxious', 'excited']).optional(),
  note: z.string().max(10000).optional(),
  imageUrl: z.string().url().nullable().optional(),
  isFavorite: z.boolean().optional(),
});

router.use(authenticate);

router.get('/', entriesController.getEntries);
router.get('/calendar', entriesController.getCalendar);
router.get('/trash', entriesController.getTrash);
router.get('/:id', entriesController.getEntry);
router.post('/', validate(createSchema), entriesController.createEntry);
router.patch('/:id', validate(updateSchema), entriesController.updateEntry);
router.delete('/trash/empty', entriesController.emptyTrash);
router.delete('/:id', entriesController.softDeleteEntry);
router.delete('/:id/hard', entriesController.hardDeleteEntry);
router.patch('/:id/restore', entriesController.restoreEntry);

export default router;
