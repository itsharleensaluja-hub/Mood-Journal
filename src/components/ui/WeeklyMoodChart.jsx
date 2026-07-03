import { motion } from 'framer-motion';
import { GlassCard } from '../common/GlassCard';
import { useJournal } from '../../context/JournalContext';

export function WeeklyMoodChart() {
  const { stats } = useJournal();
  const weeklyData = stats?.weekly || [];

  return (
    <GlassCard padding="md">
      <h3 className="text-xs font-medium text-ink-500 dark:text-ink-400 mb-4 uppercase tracking-wider">
        This week
      </h3>
      <div className="flex items-end justify-between gap-1.5 h-24" role="img" aria-label="Weekly mood chart">
        {weeklyData.map((day, index) => (
          <motion.div
            key={day.date}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="flex flex-col items-center gap-1.5 flex-1"
          >
            <span className="text-sm">{day.mood ? day.mood.emoji : '·'}</span>
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: index * 0.05 + 0.15, duration: 0.35, ease: 'easeOut' }}
              style={{
                backgroundColor: day.mood?.color || 'var(--color-ink-200)',
                opacity: day.mood ? 0.7 : 0.15,
                transformOrigin: 'bottom',
              }}
              className="w-full rounded-md"
            >
              <div className="h-16" />
            </motion.div>
            <span className="text-[10px] font-medium text-ink-400 dark:text-ink-500">
              {day.day}
            </span>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
