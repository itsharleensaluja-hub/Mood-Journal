import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Doughnut } from 'react-chartjs-2';
import { ArcElement, Tooltip, Legend } from 'chart.js';
import { Chart as ChartJS } from 'chart.js';
import { GlassCard } from '../../common/GlassCard';
import { useJournal } from '../../../context/JournalContext';
import { useTheme } from '../../../context/ThemeContext';
import { getDoughnutOptions } from '../../../utils/chartHelpers';
import { scaleIn } from '../../../utils/animations';

ChartJS.register(ArcElement, Tooltip, Legend);

export function MoodDoughnutChart() {
  const { stats } = useJournal();
  const { isDark } = useTheme();

  const chartData = useMemo(() => {
    const distribution = stats?.distribution || [];
    return {
      labels: distribution.map(d => d.label),
      datasets: [{
        data: distribution.map(d => d.count),
        backgroundColor: distribution.map(d => d.mood?.color || '#B69FCC'),
        borderColor: isDark ? 'rgba(26,24,21,0.8)' : 'rgba(253,252,250,0.8)',
        borderWidth: 2,
        hoverOffset: 6,
      }],
    };
  }, [stats, isDark]);

  const options = useMemo(() => getDoughnutOptions(isDark), [isDark]);

  return (
    <motion.div variants={scaleIn} initial="initial" animate="animate">
      <GlassCard padding="md">
        <h3 className="text-xs font-medium text-ink-500 dark:text-ink-400 uppercase tracking-wider mb-4">
          Mood Distribution
        </h3>
        <div className="h-48 flex items-center justify-center">
          {chartData.datasets[0].data.length > 0 ? (
            <Doughnut data={chartData} options={options} />
          ) : (
            <p className="text-sm text-ink-400 dark:text-ink-500">No data yet.</p>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
}
