import { GlassCard } from '../common/GlassCard';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';
import { useJournal } from '../../context/JournalContext';

const MILESTONES = [1, 3, 7, 14, 30, 60, 90];

export function StreakCounter() {
  const { stats } = useJournal();
  const streak = stats?.streak?.current || 0;
  const animatedStreak = useAnimatedCounter(streak);

  const nextMilestone = MILESTONES.find(m => m > streak) || MILESTONES[MILESTONES.length - 1];
  const progress = streak === 0 ? 0 : (streak / nextMilestone) * 100;

  return (
    <GlassCard padding="md" variant="accent" color="herb">
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">🔥</span>
        <span className="text-xs text-ink-400 dark:text-ink-500">Streak</span>
      </div>
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-2xl font-bold text-ink-900 dark:text-ink-100">{animatedStreak}</span>
        <span className="text-sm text-ink-400 dark:text-ink-500">days</span>
      </div>
      {streak > 0 && (
        <div className="mt-3">
          <div className="flex justify-between text-[10px] text-ink-400 dark:text-ink-500 mb-1">
            <span>Next milestone: {nextMilestone} days</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-1 bg-earth-200 dark:bg-ink-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-herb-400 dark:bg-herb-500 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${Math.min(100, progress)}%` }}
            />
          </div>
        </div>
      )}
    </GlassCard>
  );
}
