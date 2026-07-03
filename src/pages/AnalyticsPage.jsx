import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/common/GlassCard';
import { MoodHeatmap } from '../components/ui/analytics/MoodHeatmap';
import { WeeklyMoodLineChart } from '../components/ui/analytics/WeeklyMoodLineChart';
import { MoodDoughnutChart } from '../components/ui/analytics/MoodDoughnutChart';
import { ConsistencyBarChart } from '../components/ui/analytics/ConsistencyBarChart';
import { EmotionTags } from '../components/ui/analytics/EmotionTags';
import { MonthlyScoreCard } from '../components/ui/analytics/MonthlyScoreCard';
import { useJournal } from '../context/JournalContext';
import { staggerContainer, fadeUp } from '../utils/animations';

export function AnalyticsPage() {
  const navigate = useNavigate();
  const { entries, stats } = useJournal();

  const hasData = entries.length > 0;

  const metrics = [
    { label: 'Balance', value: stats?.balance?.score || 0, color: 'bg-plum-400' },
    { label: 'Entries', value: entries.length, color: 'bg-herb-400' },
    { label: 'Best streak', value: stats?.streak?.best || 0, suffix: 'd', color: 'bg-clay-400' },
    { label: 'This month', value: stats?.distribution?.reduce((s, d) => s + d.count, 0) || 0, color: 'bg-ink-300' },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="pb-8"
    >
      <motion.div variants={fadeUp} className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-ink-900 dark:text-ink-100 mb-1">
          Analytics
        </h1>
        <p className="text-sm text-ink-400 dark:text-ink-500">
          Your emotional journey visualized.
        </p>
      </motion.div>

      <motion.div variants={fadeUp} className="flex flex-wrap gap-5 mb-7">
        {metrics.map((m) => (
          <div key={m.label} className="flex items-center gap-2.5">
            <span className={`w-2 h-2 rounded-full ${m.color}`} />
            <div>
              <div className="text-lg font-semibold text-ink-900 dark:text-ink-100">
                {m.value}{m.suffix || ''}
              </div>
              <div className="text-xs text-ink-400 dark:text-ink-500">{m.label}</div>
            </div>
          </div>
        ))}
      </motion.div>

      {!hasData ? (
        <motion.div variants={fadeUp} className="py-20 text-center">
          <div className="w-16 h-16 rounded-xl bg-earth-200 dark:bg-ink-800 flex items-center justify-center mx-auto mb-5">
            <span className="text-2xl">◈</span>
          </div>
          <h2 className="text-lg font-serif font-semibold text-ink-800 dark:text-ink-200 mb-2">
            No data yet
          </h2>
          <p className="text-sm text-ink-400 dark:text-ink-500 mb-6 max-w-xs mx-auto">
            Start journaling to see your analytics come to life with beautiful charts and insights.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-5 py-2.5 bg-plum-500 hover:bg-plum-600 text-white rounded-lg text-sm font-medium transition-colors duration-150"
          >
            Log your first entry
          </button>
        </motion.div>
      ) : (
        <>
          <motion.div variants={fadeUp}>
            <MoodHeatmap />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            <WeeklyMoodLineChart />
            <MoodDoughnutChart />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            <ConsistencyBarChart />
            <EmotionTags />
          </div>

          <motion.div variants={fadeUp}>
            <MonthlyScoreCard />
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
