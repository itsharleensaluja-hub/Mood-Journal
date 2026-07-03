export const GARDEN_STAGES = [
  {
    id: 'sprout',
    emoji: '🌱',
    minStreak: 1,
    maxStreak: 3,
    title: 'Sprout',
    message: 'Every journey begins with a single step.',
    color: '#A7F3D0',
    gradient: 'from-emerald-200 to-teal-300',
    icon: '🌱',
  },
  {
    id: 'plant',
    emoji: '🌿',
    minStreak: 4,
    maxStreak: 7,
    title: 'Plant',
    message: "You're growing stronger every day.",
    color: '#6EE7B7',
    gradient: 'from-green-300 to-emerald-400',
    icon: '🌿',
  },
  {
    id: 'bloom',
    emoji: '🌸',
    minStreak: 8,
    maxStreak: 14,
    title: 'Bloom',
    message: 'Your consistency is beautiful.',
    color: '#F9A8D4',
    gradient: 'from-pink-300 to-rose-300',
    icon: '🌸',
  },
  {
    id: 'flourish',
    emoji: '🌳',
    minStreak: 15,
    maxStreak: Infinity,
    title: 'Flourish',
    message: 'You are thriving! Keep going!',
    color: '#34D399',
    gradient: 'from-emerald-400 to-teal-500',
    icon: '🌳',
  },
];

export function getGardenStage(streak) {
  if (streak <= 0) return null;
  for (let i = GARDEN_STAGES.length - 1; i >= 0; i--) {
    if (streak >= GARDEN_STAGES[i].minStreak) {
      return GARDEN_STAGES[i];
    }
  }
  return GARDEN_STAGES[0];
}

export function getNextStage(streak) {
  for (const stage of GARDEN_STAGES) {
    if (streak < stage.minStreak) {
      return stage;
    }
  }
  return GARDEN_STAGES[GARDEN_STAGES.length - 1];
}

export function getProgressToNextStage(streak) {
  const current = getGardenStage(streak);
  const next = getNextStage(streak);
  if (!current || current.id === next.id) return 100;
  const range = next.minStreak - current.minStreak;
  const progress = streak - current.minStreak;
  return Math.min(100, (progress / range) * 100);
}
