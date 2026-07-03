import { useJournal } from '../../context/JournalContext';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';
import { HandwrittenText } from '../archive/HandwrittenText';

const MILESTONES = [1, 3, 7, 14, 30, 60, 90];

export function RibbonStreak() {
  const { stats } = useJournal();
  const streak = stats?.streak?.current || 0;
  const animatedStreak = useAnimatedCounter(streak);

  const nextMilestone = MILESTONES.find(m => m > streak) || MILESTONES[MILESTONES.length - 1];
  const progress = streak === 0 ? 0 : (streak / nextMilestone) * 100;

  return (
    <div className="flex items-start gap-3 py-1">
      <div className="relative flex flex-col items-center">
        <div className={`w-1 rounded-full flex-1 ${streak > 0 ? 'bg-gradient-to-b from-brass-400 to-herb-400' : 'bg-ink-200 dark:bg-ink-700'}`} style={{ minHeight: '4rem' }} />
        <div className={`w-3 h-3 rounded-full mt-1 ${streak > 0 ? 'bg-brass-400' : 'bg-ink-300 dark:bg-ink-600'}`} />
      </div>
      <div>
        <HandwrittenText as="div" size="xl" className="text-ink-800 dark:text-ink-200">
          {animatedStreak} <span className="text-base text-ink-400 dark:text-ink-500">days</span>
        </HandwrittenText>
        <HandwrittenText size="sm" color="ink-600">
          {streak === 0 ? 'Start your streak today' : `${streak}-day streak`}
        </HandwrittenText>
        {streak > 0 && (
          <div className="mt-2 w-32">
            <div className="flex justify-between text-[10px] typewriter text-ink-400 dark:text-ink-500 mb-1">
              <span>next: {nextMilestone}d</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-1 bg-earth-200 dark:bg-ink-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-brass-400 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${Math.min(100, progress)}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
