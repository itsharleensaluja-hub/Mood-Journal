import { motion } from 'framer-motion';
import { HeroGreeting } from '../components/layout/HeroGreeting';
import { MoodSelector } from '../components/ui/MoodSelector';
import { QuickJournalCard } from '../components/ui/QuickJournalCard';
import { AffirmationCard } from '../components/ui/AffirmationCard';
import { WeeklyMoodChart } from '../components/ui/WeeklyMoodChart';
import { RecentEntries } from '../components/ui/RecentEntries';
import { AiReflectionButton } from '../components/ui/AiReflectionButton';
import { EmotionGarden } from '../components/ui/garden/EmotionGarden';
import { StreakCounter } from '../components/ui/StreakCounter';
import { EmotionalBalance } from '../components/ui/EmotionalBalance';
import { staggerContainer, fadeUp } from '../utils/animations';

export function HomePage() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="pb-8"
    >
      <motion.div variants={fadeUp}>
        <HeroGreeting />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <div className="lg:col-span-2 space-y-5">
          <motion.div variants={fadeUp}>
            <MoodSelector />
          </motion.div>
          <motion.div variants={fadeUp}>
            <QuickJournalCard />
          </motion.div>
          <motion.div variants={fadeUp}>
            <RecentEntries />
          </motion.div>
        </div>
        <div className="space-y-5">
          <motion.div variants={fadeUp}>
            <StreakCounter />
          </motion.div>
          <motion.div variants={fadeUp}>
            <EmotionalBalance />
          </motion.div>
          <motion.div variants={fadeUp}>
            <WeeklyMoodChart />
          </motion.div>
          <motion.div variants={fadeUp}>
            <AffirmationCard />
          </motion.div>
        </div>
      </div>

      <motion.div variants={fadeUp} className="mb-6">
        <EmotionGarden />
      </motion.div>

      <motion.div variants={fadeUp}>
        <AiReflectionButton />
      </motion.div>
    </motion.div>
  );
}
