import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import { GlassCard } from '../../common/GlassCard';
import { useJournal } from '../../../context/JournalContext';
import { useTheme } from '../../../context/ThemeContext';
import { getDefaultChartOptions } from '../../../utils/chartHelpers';
import { scaleIn } from '../../../utils/animations';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export function ConsistencyBarChart() {
  const { entries } = useJournal();
  const { isDark } = useTheme();

  const chartData = useMemo(() => {
    const weeks = [];
    const today = new Date();

    for (let w = 3; w >= 0; w--) {
      let count = 0;
      for (let d = 0; d < 7; d++) {
        const date = new Date(today);
        date.setDate(date.getDate() - (w * 7 + d));
        const dateStr = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        const hasEntry = entries.some(e => {
          const ed = new Date(e.createdAt);
          return `${ed.getFullYear()}-${ed.getMonth()}-${ed.getDate()}` === dateStr;
        });
        if (hasEntry) count++;
      }
      weeks.push({ label: `Week ${w + 1}`, count: count, percentage: Math.round((count / 7) * 100) });
    }

    return {
      labels: weeks.map(w => w.label),
      datasets: [{
        label: 'Entries',
        data: weeks.map(w => w.count),
        backgroundColor: weeks.map(w =>
          w.percentage >= 70 ? '#7A9E8A' : w.percentage >= 40 ? '#B69FCC' : '#E8B8A8'
        ),
        borderRadius: 6,
        borderSkipped: false,
      }],
    };
  }, [entries]);

  const options = useMemo(() => ({
    ...getDefaultChartOptions(isDark),
    plugins: { ...getDefaultChartOptions(isDark).plugins, legend: { display: false } },
    scales: {
      ...getDefaultChartOptions(isDark).scales,
      y: { ...getDefaultChartOptions(isDark).scales.y, max: 7, ticks: { stepSize: 1 } },
    },
  }), [isDark]);

  return (
    <motion.div variants={scaleIn} initial="initial" animate="animate">
      <GlassCard padding="md">
        <h3 className="text-xs font-medium text-ink-500 dark:text-ink-400 uppercase tracking-wider mb-4">
          Consistency
        </h3>
        <div className="h-36">
          <Bar data={chartData} options={options} />
        </div>
      </GlassCard>
    </motion.div>
  );
}
