import { motion } from 'framer-motion';
import { HandwrittenText } from '../archive/HandwrittenText';
import { WellnessCard } from './WellnessCard';
import { WELLNESS_MODULES } from '../../data/wellness';
import { fadeUp, staggerContainer } from '../../utils/animations';

export function WellnessHub({ onSelect }) {
  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate">
      <motion.div variants={fadeUp} className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-herb-100/50 dark:bg-herb-900/30 border border-herb-200/50 dark:border-herb-700/30 mb-4">
          <span className="text-herb-400 text-sm">✦</span>
          <HandwrittenText size="sm" color="ink-500">Interactive Wellness</HandwrittenText>
        </div>
        <HandwrittenText as="h1" size="xl" className="text-ink-900 dark:text-ink-100 mb-1">
          Wellness Studio
        </HandwrittenText>
        <HandwrittenText size="sm" color="ink-500" className="mb-2 block">
          Quizzes, meditations, calming games, and soothing sounds
        </HandwrittenText>
      </motion.div>

      <motion.div variants={fadeUp}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {WELLNESS_MODULES.map((mod) => (
            <WellnessCard key={mod.id} module={mod} onClick={() => onSelect(mod.id)} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
