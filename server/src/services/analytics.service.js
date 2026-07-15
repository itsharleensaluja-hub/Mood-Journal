import { Entry } from '../models/Entry.js';
import { MOOD_SCORES, STREAK_MAX_LOOKBACK } from '../utils/constants.js';

function getTodayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function formatDate(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export async function getStreak(userId) {
  const entries = await Entry.find({ userId })
    .sort({ createdAt: -1 })
    .select('createdAt')
    .lean();

  const dateSet = new Set(entries.map(e => formatDate(new Date(e.createdAt))));
  const dates = [...dateSet].sort().reverse();

  if (dates.length === 0) {
    return { current: 0, best: 0 };
  }

  const todayStr = getTodayStr();
  let current = 0;
  const checkDate = new Date(todayStr);

  for (let i = 0; i < STREAK_MAX_LOOKBACK; i++) {
    const ds = formatDate(checkDate);
    if (dateSet.has(ds)) {
      current++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  let best = 0;
  let temp = 0;
  const sorted = [...dateSet].sort();
  for (let i = 0; i < sorted.length; i++) {
    if (i === 0) {
      temp = 1;
    } else {
      const prev = new Date(sorted[i - 1]);
      const curr = new Date(sorted[i]);
      const diff = Math.round((curr - prev) / (1000 * 60 * 60 * 24));
      temp = diff === 1 ? temp + 1 : 1;
    }
    best = Math.max(best, temp);
  }

  return { current, best };
}

export async function getBalance(userId) {
  const entries = await Entry.find({ userId })
    .sort({ createdAt: -1 })
    .limit(14)
    .select('moodId')
    .lean();

  if (entries.length === 0) {
    return { score: 50, level: 'Neutral' };
  }

  const total = entries.reduce((sum, e) => sum + (MOOD_SCORES[e.moodId] || 50), 0);
  const avg = Math.round(total / entries.length);

  let level;
  if (avg >= 75) level = 'Thriving';
  else if (avg >= 60) level = 'Balanced';
  else if (avg >= 40) level = 'Managing';
  else level = 'Struggling';

  return { score: avg, level };
}

export async function getWeeklyData(userId) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const weekData = [];

  const entries = await Entry.find({ userId })
    .sort({ createdAt: -1 })
    .select('moodId createdAt')
    .lean();

  const entryByDate = new Map();
  for (const e of entries) {
    const ds = formatDate(new Date(e.createdAt));
    if (!entryByDate.has(ds)) {
      entryByDate.set(ds, e);
    }
  }

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const ds = formatDate(date);
    const entry = entryByDate.get(ds);

    weekData.push({
      day: days[date.getDay()],
      date: ds,
      moodId: entry?.moodId || null,
      score: entry ? (MOOD_SCORES[entry.moodId] || 50) : 0,
    });
  }

  return weekData;
}

export async function getDistribution(userId) {
  const entries = await Entry.find({ userId })
    .select('moodId')
    .lean();

  if (entries.length === 0) return [];

  const counts = {};
  for (const e of entries) {
    counts[e.moodId] = (counts[e.moodId] || 0) + 1;
  }

  const total = entries.length;
  return Object.entries(counts).map(([moodId, count]) => ({
    moodId,
    count,
    percentage: Math.round((count / total) * 100),
  }));
}

export async function getTopMoods(userId, limit = 5) {
  const entries = await Entry.find({ userId })
    .select('moodId')
    .lean();

  const counts = {};
  for (const e of entries) {
    counts[e.moodId] = (counts[e.moodId] || 0) + 1;
  }

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([moodId, count]) => ({ moodId, count }));
}

export async function getMonthlyScores(userId, months = 6) {
  const entries = await Entry.find({ userId })
    .select('moodId createdAt')
    .lean();

  const now = new Date();
  const monthlyData = [];

  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthEntries = entries.filter(e => {
      const d = new Date(e.createdAt);
      return d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear();
    });

    if (monthEntries.length === 0) {
      monthlyData.push({
        label: date.toLocaleDateString('en-US', { month: 'short' }),
        score: 0,
        count: 0,
      });
    } else {
      const total = monthEntries.reduce((sum, e) => sum + (MOOD_SCORES[e.moodId] || 50), 0);
      monthlyData.push({
        label: date.toLocaleDateString('en-US', { month: 'short' }),
        score: Math.round(total / monthEntries.length),
        count: monthEntries.length,
      });
    }
  }

  return monthlyData;
}

export async function getTotalEntries(userId) {
  return Entry.countDocuments({ userId });
}

export async function getTotalActiveDays(userId) {
  const entries = await Entry.find({ userId })
    .select('createdAt')
    .lean();
  const dateSet = new Set(entries.map(e => formatDate(new Date(e.createdAt))));
  return dateSet.size;
}

export async function getAllAnalytics(userId) {
  const [streak, balance, totalEntries, totalActiveDays, weekly, distribution, topMoods, monthly] = await Promise.all([
    getStreak(userId),
    getBalance(userId),
    getTotalEntries(userId),
    getTotalActiveDays(userId),
    getWeeklyData(userId),
    getDistribution(userId),
    getTopMoods(userId),
    getMonthlyScores(userId),
  ]);
  return { streak, balance, totalEntries, totalActiveDays, weekly, distribution, topMoods, monthly };
}
