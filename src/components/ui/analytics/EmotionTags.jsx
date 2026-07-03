import { motion } from 'framer-motion';
import { GlassCard } from '../../common/GlassCard';
import { useJournal } from '../../../context/JournalContext';
import { staggerContainer, fadeUp } from '../../../utils/animations';

export function EmotionTags() {
  const { stats } = useJournal();
  const topMoods = stats?.topMoods || [];

  return (
    <GlassCard padding="md">
      <h3 className="text-xs font-medium text-ink-500 dark:text-ink-400 uppercase tracking-wider mb-4">
        Most used emotions
      </h3>

      {topMoods.length === 0 ? (
        <p className="text-sm text-ink-400 dark:text-ink-500 text-center py-6">No mood data yet.</p>
      ) : (
        <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-3">
          {topMoods.map((item, i) => (
            <motion.div key={item.mood?.id || i} variants={fadeUp} className="flex items-center gap-3">
              <span className="text-base flex-shrink-0">{item.mood?.emoji || '📝'}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-ink-700 dark:text-ink-300">{item.mood?.label || 'Unknown'}</span>
                  <span className="text-xs text-ink-400 dark:text-ink-500">×{item.count}</span>
                </div>
                <div className="w-full h-1.5 bg-earth-200 dark:bg-ink-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (item.count / (topMoods[0]?.count || 1)) * 100)}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.08 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.mood?.color || '#B69FCC' }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </GlassCard>
  );
}
