import { asyncHandler } from '../utils/asyncHandler.js';
import * as analyticsService from '../services/analytics.service.js';

export const getStats = asyncHandler(async (req, res) => {
  const [streak, balance, totalEntries] = await Promise.all([
    analyticsService.getStreak(req.user._id),
    analyticsService.getBalance(req.user._id),
    analyticsService.getTotalEntries(req.user._id),
  ]);
  res.json({ success: true, stats: { streak, balance, totalEntries } });
});

export const getWeekly = asyncHandler(async (req, res) => {
  const weekly = await analyticsService.getWeeklyData(req.user._id);
  res.json({ success: true, weekly });
});

export const getDistribution = asyncHandler(async (req, res) => {
  const distribution = await analyticsService.getDistribution(req.user._id);
  res.json({ success: true, distribution });
});

export const getTopMoods = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 5;
  const topMoods = await analyticsService.getTopMoods(req.user._id, limit);
  res.json({ success: true, topMoods });
});

export const getMonthly = asyncHandler(async (req, res) => {
  const months = parseInt(req.query.months, 10) || 6;
  const monthly = await analyticsService.getMonthlyScores(req.user._id, months);
  res.json({ success: true, monthly });
});

export const getAll = asyncHandler(async (req, res) => {
  const all = await analyticsService.getAllAnalytics(req.user._id);
  res.json({ success: true, ...all });
});
