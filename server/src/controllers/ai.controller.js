import { asyncHandler } from '../utils/asyncHandler.js';
import { generateAiResponse } from '../services/ai.service.js';

export const reflect = asyncHandler(async (req, res) => {
  const { text, moodId } = req.validatedBody;
  const result = generateAiResponse({
    text,
    moodId,
    userName: req.user.name,
  });
  res.json({ success: true, ...result });
});
