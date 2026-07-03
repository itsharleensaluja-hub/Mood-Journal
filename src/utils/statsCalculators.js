import { getMoodById } from '../data/moods';

export function calculateStreak(entries) {
  if (!entries || entries.length === 0) return { current: 0, best: 0, dates: [] };

  const dates = entries
    .map(e => {
      const d = new Date(e.createdAt);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    })
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort()
    .reverse();

  if (dates.length === 0) return { current: 0, best: 0, dates: [] };

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  let current = 0;
  let checkDate = new Date(todayStr);
  const datesSet = new Set(dates);

  for (let i = 0; i < 365; i++) {
    const dateStr = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;
    if (datesSet.has(dateStr)) {
      current++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  let best = 0;
  let tempStreak = 0;
  const sortedDates = dates.sort();
  for (let i = 0; i < sortedDates.length; i++) {
    if (i === 0) {
      tempStreak = 1;
    } else {
      const prev = new Date(sortedDates[i - 1]);
      const curr = new Date(sortedDates[i]);
      const diffDays = Math.round((curr - prev) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        tempStreak++;
      } else {
        tempStreak = 1;
      }
    }
    best = Math.max(best, tempStreak);
  }

  return { current, best, dates: sortedDates };
}

export function calculateEmotionalBalance(entries) {
  if (!entries || entries.length === 0) return { score: 50, level: 'Neutral' };

  const moodScores = {
    happy: 90,
    calm: 80,
    neutral: 60,
    excited: 85,
    sad: 35,
    angry: 25,
    anxious: 30,
  };

  const recent = entries.slice(-14);
  if (recent.length === 0) return { score: 50, level: 'Neutral' };

  const total = recent.reduce((sum, entry) => {
    const score = moodScores[entry.moodId] || 50;
    return sum + score;
  }, 0);

  const avg = Math.round(total / recent.length);

  let level;
  if (avg >= 75) level = 'Thriving';
  else if (avg >= 60) level = 'Balanced';
  else if (avg >= 40) level = 'Managing';
  else level = 'Struggling';

  return { score: avg, level };
}

export function getWeeklyMoodData(entries) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const weekData = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    const dayEntry = entries.find(e => {
      const d = new Date(e.createdAt);
      const ds = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      return ds === dateStr;
    });

    weekData.push({
      day: days[date.getDay()],
      date: dateStr,
      mood: dayEntry ? getMoodById(dayEntry.moodId) : null,
      score: dayEntry ? (getMoodById(dayEntry.moodId) ? 1 : 0) : 0,
    });
  }

  return weekData;
}

export function getMoodDistribution(entries) {
  if (!entries || entries.length === 0) return [];

  const counts = {};
  for (const entry of entries) {
    const mood = getMoodById(entry.moodId);
    if (mood) {
      counts[mood.label] = (counts[mood.label] || 0) + 1;
    }
  }

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return Object.entries(counts).map(([label, count]) => ({
    label,
    count,
    percentage: Math.round((count / total) * 100),
    mood: getMoodById(
      entries.find(e => getMoodById(e.moodId)?.label === label)?.moodId
    ),
  }));
}

export function getMonthlyScore(entries, year, month) {
  const monthEntries = entries.filter(e => {
    const d = new Date(e.createdAt);
    return d.getFullYear() === year && d.getMonth() === month;
  });

  if (monthEntries.length === 0) return { score: 0, count: 0, avgMood: null };
  return calculateEmotionalBalance(monthEntries);
}

export function getMostUsedMoods(entries, limit = 5) {
  if (!entries || entries.length === 0) return [];

  const counts = {};
  for (const entry of entries) {
    counts[entry.moodId] = (counts[entry.moodId] || 0) + 1;
  }

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([moodId, count]) => ({
      mood: getMoodById(moodId),
      count,
    }));
}
