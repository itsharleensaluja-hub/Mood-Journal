import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../../common/GlassCard';
import { useJournal } from '../../../context/JournalContext';
import { useAnimatedCounter } from '../../../hooks/useAnimatedCounter';
import { calculateEmotionalBalance } from '../../../utils/statsCalculators';
import { scaleIn } from '../../../utils/animations';

export function MonthlyScoreCard() {
  const { entries } = useJournal();

  const monthlyData = useMemo(() => {
    const now = new Date();
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEntries = entries.filter(e => {
        const d = new Date(e.createdAt);
        return d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear();
      });
      months.push({
        label: date.toLocaleDateString('en-US', { month: 'short' }),
        ...calculateEmotionalBalance(monthEntries),
        count: monthEntries.length,
      });
    }
    return months;
  }, [entries]);

  const currentScore = monthlyData[monthlyData.length - 1]?.score || 0;
  const animatedScore = useAnimatedCounter(currentScore);

  return (
    <motion.div variants={scaleIn} initial="initial" animate="animate">
      <GlassCard padding="md" variant="accent" color="plum">
        <h3 className="text-xs font-medium text-ink-500 dark:text-ink-400 uppercase tracking-wider mb-4">
          Monthly Score
        </h3>

        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-3xl font-serif font-bold text-plum-500 dark:text-plum-400">{animatedScore}</span>
          <span className="text-sm text-ink-400 dark:text-ink-500">/ 100</span>
        </div>
        <p className="text-xs text-ink-400 dark:text-ink-500 mb-4">
          {monthlyData[monthlyData.length - 1]?.count || 0} entries this month
        </p>

        <div className="flex items-end gap-1.5 h-20">
          {monthlyData.map((month, i) => {
            const height = Math.max(5, (month.score / 100) * 100);
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                  className="w-full rounded-t-md"
                  style={{
                    backgroundColor: month.score >= 70 ? '#7A9E8A' : month.score >= 40 ? '#B69FCC' : '#E8B8A8',
                    opacity: i === monthlyData.length - 1 ? 1 : 0.5,
                  }}
                />
                <span className="text-[9px] text-ink-400 dark:text-ink-500">{month.label}</span>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </motion.div>
  );
}
