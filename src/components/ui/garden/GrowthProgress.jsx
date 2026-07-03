import { useJournal } from '../../../context/JournalContext';
import { getNextStage, getProgressToNextStage } from '../../../data/gardenStages';

export function GrowthProgress() {
  const { stats } = useJournal();
  const streak = stats?.streak?.current || 0;
  const nextStage = getNextStage(streak);
  const progress = getProgressToNextStage(streak);

  return (
    <div>
      <div className="flex justify-between text-xs text-ink-400 dark:text-ink-500 mb-1">
        <span>Growth to next stage</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="w-full h-2 bg-earth-200 dark:bg-ink-700 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-herb-400 dark:bg-herb-500 transition-all duration-700 ease-out"
          style={{ width: `${Math.min(100, progress)}%` }}
        />
      </div>
      {nextStage && (
        <p className="text-xs text-ink-400 dark:text-ink-500 mt-1">
          Next: {nextStage.icon} {nextStage.title} ({nextStage.minStreak} days)
        </p>
      )}
    </div>
  );
}
