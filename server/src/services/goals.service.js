import { Goal } from '../models/Goal.js';
import { ApiError } from '../utils/ApiError.js';

function getTodayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export async function getTodayGoal(userId) {
  const today = getTodayStr();
  const goal = await Goal.findOne({ userId, date: today }).lean();
  return goal || null;
}

export async function setTodayGoal(userId, text) {
  const today = getTodayStr();
  const goal = await Goal.findOneAndUpdate(
    { userId, date: today },
    { text, date: today },
    { upsert: true, new: true, runValidators: true },
  );
  return goal;
}
