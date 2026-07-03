import { motion } from 'framer-motion';
import { GlassCard } from '../../common/GlassCard';
import { TypewriterText } from './TypewriterText';
import { BreathingExercise } from './BreathingExercise';
import { QuoteCard } from './QuoteCard';
import { GoalInput } from './GoalInput';
import { staggerContainer, fadeUp } from '../../../utils/animations';

function saveGoal(goal) {
  try {
    window.localStorage.setItem('mindpulse-tomorrow-goal', goal);
  } catch {
    // localStorage unavailable
  }
}

export function AiResponse({ response, isLoading }) {
  if (isLoading) {
    return (
      <GlassCard padding="md" className="text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="w-4 h-4 border-2 border-plum-300 border-t-plum-500 rounded-full"
          />
          <span className="text-sm text-ink-400 dark:text-ink-500">Reflecting on your words...</span>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-ink-200 dark:bg-ink-700 rounded w-full animate-pulse-soft" />
          <div className="h-3 bg-ink-200 dark:bg-ink-700 rounded w-3/4 animate-pulse-soft" style={{ animationDelay: '0.15s' }} />
          <div className="h-3 bg-ink-200 dark:bg-ink-700 rounded w-1/2 animate-pulse-soft" style={{ animationDelay: '0.3s' }} />
        </div>
      </GlassCard>
    );
  }

  if (!response) {
    return (
      <GlassCard padding="md">
        <div className="text-center py-8">
          <div className="w-12 h-12 rounded-xl bg-earth-200 dark:bg-ink-800 flex items-center justify-center mx-auto mb-4">
            <span className="text-lg">✦</span>
          </div>
          <p className="text-sm text-ink-400 dark:text-ink-500">
            Write a journal entry and generate your AI reflection to see insights here.
          </p>
        </div>
      </GlassCard>
    );
  }

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-4">
      <motion.div variants={fadeUp}>
        <GlassCard padding="md" variant="highlight">
          <h3 className="text-xs font-medium text-plum-500 dark:text-plum-400 uppercase tracking-wider mb-3">
            AI Reflection
          </h3>
          <TypewriterText text={response.reflection} speed={25} />
        </GlassCard>
      </motion.div>

      <motion.div variants={fadeUp}>
        <GlassCard padding="md">
          <h4 className="text-xs font-medium text-herb-500 dark:text-herb-400 uppercase tracking-wider mb-2">
            Personal Reflection
          </h4>
          <p className="text-sm text-ink-700 dark:text-ink-300 leading-relaxed">
            {response.fullReflection || response.reflection}
          </p>
        </GlassCard>
      </motion.div>

      <motion.div variants={fadeUp}>
        <GlassCard padding="md" variant="accent" color="plum">
          <h4 className="text-xs font-medium text-ink-400 dark:text-ink-500 uppercase tracking-wider mb-2">
            Daily Affirmation
          </h4>
          <p className="text-base font-serif italic text-ink-800 dark:text-ink-200 leading-relaxed">
            &ldquo;{response.affirmation}&rdquo;
          </p>
        </GlassCard>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div variants={fadeUp}>
          <GoalInput suggestedGoal={response.goal} onSave={saveGoal} />
        </motion.div>
        <motion.div variants={fadeUp}>
          <BreathingExercise exercise={response.breathing} />
        </motion.div>
      </div>

      <motion.div variants={fadeUp}>
        <QuoteCard quote={response.quote} />
      </motion.div>
    </motion.div>
  );
}
