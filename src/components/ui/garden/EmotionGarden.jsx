import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../../common/GlassCard';
import { GardenStage } from './GardenStage';
import { useJournal } from '../../../context/JournalContext';
import { getGardenStage, getNextStage, getProgressToNextStage } from '../../../data/gardenStages';

export function EmotionGarden() {
  const { stats } = useJournal();
  const streak = stats?.streak?.current || 0;
  const currentStage = getGardenStage(streak);

  const progress = useMemo(() => getProgressToNextStage(streak), [streak]);
  const nextStage = useMemo(() => getNextStage(streak), [streak]);

  return (
    <GlassCard padding="md" variant="accent" color="herb">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-sm">🌱</span>
        <h2 className="text-sm font-medium text-ink-700 dark:text-ink-300">Emotion Garden</h2>
      </div>

      {!currentStage ? (
        <div className="text-center py-6">
          <span className="text-3xl block mb-3">🌱</span>
          <p className="text-sm text-ink-400 dark:text-ink-500">
            Start journaling to grow your garden!
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <GardenStage stage={currentStage} />
          </div>

          <p className="text-sm font-medium text-ink-800 dark:text-ink-200 mb-1">
            {currentStage.emoji} {currentStage.title}
          </p>
          <p className="text-xs text-ink-400 dark:text-ink-500 mb-4 text-center">
            {currentStage.message}
          </p>

          {nextStage && nextStage.id !== currentStage.id && (
            <div className="w-full max-w-xs">
              <div className="flex justify-between text-[10px] text-ink-400 dark:text-ink-500 mb-1">
                <span>To {nextStage.title}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-1.5 bg-earth-200 dark:bg-ink-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, progress)}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full rounded-full bg-herb-400 dark:bg-herb-500"
                />
              </div>
              <p className="text-[10px] text-ink-400 dark:text-ink-500 mt-1">
                {nextStage.minStreak - streak} more days to reach {nextStage.title}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="mt-5 pt-4 border-t border-ink-200 dark:border-ink-700">
        <div className="flex justify-between text-xs text-ink-400 dark:text-ink-500">
          <span>🌱 Sprout</span>
          <span>🌿 Plant</span>
          <span>🌸 Bloom</span>
          <span>🌳 Flourish</span>
        </div>
      </div>
    </GlassCard>
  );
}
