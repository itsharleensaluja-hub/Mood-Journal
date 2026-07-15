import { lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Notebook } from '../components/archive/Notebook';
import { HandwrittenText } from '../components/archive/HandwrittenText';
import { InkDivider } from '../components/archive/InkDivider';
import { Marginalia } from '../components/archive/Marginalia';
import { useJournal } from '../context/JournalContext';
import { EmotionTags } from '../components/ui/analytics/EmotionTags';
import { MonthlyScoreCard } from '../components/ui/analytics/MonthlyScoreCard';
import { StatCard } from '../components/ui/analytics/StatCard';
import { ArtifactCard } from '../components/archive/ArtifactCard';
import { Skeleton } from '../components/common/Skeleton';
import { staggerContainer, fadeUp } from '../utils/animations';

const MoodHeatmap = lazy(() => import('../components/ui/analytics/MoodHeatmap').then(m => ({ default: m.MoodHeatmap })));
const EmotionalLandscape = lazy(() => import('../components/ui/analytics/EmotionalLandscape').then(m => ({ default: m.EmotionalLandscape })));

function SpecimenHeader() {
  const { entries, stats } = useJournal();

  const metrics = [
    { label: 'Balance', value: stats?.balance?.score || 0, color: 'plum' },
    { label: 'Entries', value: entries.length, color: 'herb' },
    { label: 'Best streak', value: stats?.streak?.best || 0, suffix: 'd', color: 'clay' },
    { label: 'This month', value: stats?.distribution?.reduce((s, d) => s + d.count, 0) || 0, color: 'ink' },
  ];

  return (
    <div className="flex flex-wrap gap-5 mb-6">
      {metrics.map((m) => (
        <StatCard key={m.label} label={m.label} value={m.value} suffix={m.suffix || ''} color={m.color} />
      ))}
    </div>
  );
}

export function AnalyticsPage() {
  const navigate = useNavigate();
  const { entries } = useJournal();
  const hasData = entries.length > 0;

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="pb-8"
    >
      <motion.div variants={fadeUp}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-earth-200/50 dark:bg-ink-800/40 border border-earth-300/50 dark:border-ink-700/50 mb-4">
          <span className="text-brass-400 text-sm">◇</span>
          <HandwrittenText size="sm" color="ink-500">Archive</HandwrittenText>
        </div>
        <HandwrittenText as="h1" size="xl" className="text-ink-900 dark:text-ink-100 mb-1">
          Your Collection
        </HandwrittenText>
        <HandwrittenText size="sm" color="ink-500" className="mb-6 block">
          A cabinet of emotional artifacts
        </HandwrittenText>
      </motion.div>

      {!hasData ? (
        <motion.div variants={fadeUp}>
          <Notebook>
            <div className="py-16 text-center">
              <div className="w-16 h-16 rounded-xl bg-earth-200 dark:bg-ink-800 flex items-center justify-center mx-auto mb-5">
                <span className="text-2xl text-ink-400">◇</span>
              </div>
              <HandwrittenText as="h2" size="lg" className="text-ink-800 dark:text-ink-200 mb-2">
                Empty archive
              </HandwrittenText>
              <HandwrittenText size="sm" color="ink-500" className="mb-6">
                Start journaling to build your collection of artifacts
              </HandwrittenText>
              <button
                onClick={() => navigate('/dashboard')}
                className="handwriting text-lg px-6 py-2 bg-brass-400/20 hover:bg-brass-400/30 text-ink-700 dark:text-ink-300 rounded-lg transition-colors duration-150 border border-brass-400/30 focus-ring"
              >
                Write your first page
              </button>
            </div>
          </Notebook>
        </motion.div>
      ) : (
        <>
          <motion.div variants={fadeUp}>
            <Notebook>
              <div className="space-y-6">
                <SpecimenHeader />

                <InkDivider />

                <div>
                  <HandwrittenText as="h3" size="base" color="ink-600" className="mb-4">
                    Pressed Flower Collection
                  </HandwrittenText>
                  <Suspense fallback={<Skeleton variant="chart" />}>
                    <MoodHeatmap />
                  </Suspense>
                </div>

                <InkDivider />

                <ArtifactCard variant="specimen" className="p-4 sm:p-6">
                  <Suspense fallback={<Skeleton variant="chart" />}>
                    <EmotionalLandscape />
                  </Suspense>
                </ArtifactCard>

                <InkDivider />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <EmotionTags />
                  <MonthlyScoreCard />
                </div>
              </div>
            </Notebook>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-6">
            <Marginalia color="plum">
              Your archive grows richer with every entry. Patterns emerge like pressed flowers between pages.
            </Marginalia>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
