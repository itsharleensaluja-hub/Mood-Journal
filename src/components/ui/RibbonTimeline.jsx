import { motion } from 'framer-motion';
import { useJournal } from '../../context/JournalContext';
import { HandwrittenText } from '../archive/HandwrittenText';
import { getMoodById } from '../../data/moods';

export function RibbonTimeline() {
  const { stats } = useJournal();
  const weeklyData = stats?.weekly || [];

  return (
    <div>
      <HandwrittenText as="h3" size="sm" color="ink-500" className="uppercase tracking-wider typewriter text-[11px] mb-4">
        This week
      </HandwrittenText>
      <div className="flex items-end justify-between gap-1.5 h-24" role="img" aria-label="Weekly mood ribbon">
        {weeklyData.map((day, index) => (
          <motion.div
            key={day.date}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="flex flex-col items-center gap-1 flex-1"
          >
            <span className="text-xs">{getMoodById(day.moodId) ? getMoodById(day.moodId).emoji : '·'}</span>
            <div className="flex-1 w-full flex flex-col justify-end">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: index * 0.05 + 0.15, duration: 0.35, ease: 'easeOut' }}
                style={{
                  backgroundColor: getMoodById(day.moodId)?.color || 'var(--color-ink-200)',
                  opacity: day.moodId ? 0.7 : 0.15,
                  transformOrigin: 'bottom',
                  minHeight: '4px',
                }}
                className="w-full rounded-t-sm"
              >
                <div className="h-12" />
              </motion.div>
            </div>
            <HandwrittenText size="xs" color="ink-400">{day.day}</HandwrittenText>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
