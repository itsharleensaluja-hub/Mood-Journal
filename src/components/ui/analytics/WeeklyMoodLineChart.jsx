import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js';
import { GlassCard } from '../../common/GlassCard';
import { useJournal } from '../../../context/JournalContext';
import { useTheme } from '../../../context/ThemeContext';
import { getDefaultChartOptions } from '../../../utils/chartHelpers';
import { getMoodById } from '../../../data/moods';
import { scaleIn } from '../../../utils/animations';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler);

export function WeeklyMoodLineChart() {
  const { entries } = useJournal();
  const { isDark } = useTheme();

  const chartData = useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const labels = [];
    const scores = [];
    const colors = [];
    const moodScores = { happy: 90, calm: 80, neutral: 60, excited: 85, sad: 35, angry: 25, anxious: 30 };

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      labels.push(days[date.getDay()]);
      const entry = entries.find(e => {
        const d = new Date(e.createdAt);
        return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}` === `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      });
      if (entry) {
        const mood = getMoodById(entry.moodId);
        scores.push(moodScores[entry.moodId] || 50);
        colors.push(mood?.color || '#B69FCC');
      } else {
        scores.push(null);
        colors.push('transparent');
      }
    }

    return {
      labels,
      datasets: [{
        data: scores,
        borderColor: '#B69FCC',
        backgroundColor: 'rgba(182, 159, 204, 0.08)',
        pointBackgroundColor: colors,
        pointBorderColor: colors,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBorderWidth: 2,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        spanGaps: false,
      }],
    };
  }, [entries]);

  const options = useMemo(() => ({
    ...getDefaultChartOptions(isDark),
    plugins: {
      ...getDefaultChartOptions(isDark).plugins,
      legend: { display: false },
    },
    scales: {
      ...getDefaultChartOptions(isDark).scales,
      y: {
        ...getDefaultChartOptions(isDark).scales.y,
        min: 0,
        max: 100,
        ticks: { callback: (v) => v === 0 ? '' : v },
      },
    },
  }), [isDark]);

  return (
    <motion.div variants={scaleIn} initial="initial" animate="animate">
      <GlassCard padding="md">
        <h3 className="text-xs font-medium text-ink-500 dark:text-ink-400 uppercase tracking-wider mb-4">
          Weekly Mood Trend
        </h3>
        <div className="h-44">
          <Line data={chartData} options={options} />
        </div>
      </GlassCard>
    </motion.div>
  );
}
