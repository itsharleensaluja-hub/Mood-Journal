import { asyncHandler } from '../utils/asyncHandler.js';
import * as goalsService from '../services/goals.service.js';

export const getTodayGoal = asyncHandler(async (req, res) => {
  const goal = await goalsService.getTodayGoal(req.user._id);
  res.json({ success: true, goal });
});

export const setTodayGoal = asyncHandler(async (req, res) => {
  const { text } = req.validatedBody;
  const goal = await goalsService.setTodayGoal(req.user._id, text);
  res.json({ success: true, goal });
});
