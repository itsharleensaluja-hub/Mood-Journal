import { motion } from 'framer-motion';
import { ArtifactCard } from '../../archive/ArtifactCard';
import { HandwrittenText } from '../../archive/HandwrittenText';
import { InkDivider } from '../../archive/InkDivider';
import { TypewriterText } from './TypewriterText';
import { BreathingExercise } from './BreathingExercise';
import { QuoteCard } from './QuoteCard';
import { GoalInput } from './GoalInput';
import api from '../../../hooks/useApi';
import { staggerContainer, fadeUp } from '../../../utils/animations';

function saveGoal(goal) {
  api.put('/goals/today', { text: goal }).catch(() => {});
}

export function AiResponse({ response, isLoading }) {
  if (isLoading) {
    return (
      <ArtifactCard variant="specimen" className="text-center">
        <div className="py-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-4 h-4 border-2 border-brass-300 border-t-brass-400 rounded-full animate-spin" />
            <HandwrittenText size="sm" color="ink-500">Reading your letter...</HandwrittenText>
          </div>
          <div className="space-y-2 max-w-xs mx-auto">
            <div className="h-3 bg-earth-200 dark:bg-ink-700 rounded w-full animate-pulse" />
            <div className="h-3 bg-earth-200 dark:bg-ink-700 rounded w-3/4 animate-pulse mx-auto" style={{ animationDelay: '0.15s' }} />
            <div className="h-3 bg-earth-200 dark:bg-ink-700 rounded w-1/2 animate-pulse mx-auto" style={{ animationDelay: '0.3s' }} />
          </div>
        </div>
      </ArtifactCard>
    );
  }

  if (!response) {
    return (
      <ArtifactCard variant="specimen">
        <div className="text-center py-8">
          <div className="w-12 h-12 rounded-xl bg-earth-200 dark:bg-ink-800 flex items-center justify-center mx-auto mb-4">
            <span className="text-lg text-ink-400">✦</span>
          </div>
          <HandwrittenText size="sm" color="ink-500">
            Write a letter above and send it. A reply will appear here.
          </HandwrittenText>
        </div>
      </ArtifactCard>
    );
  }

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
      <motion.div variants={fadeUp}>
        <ArtifactCard variant="tipped">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-plum-400 text-sm">✦</span>
            <HandwrittenText as="h3" size="sm" color="plum-600" className="typewriter text-[10px] uppercase tracking-widest">
              AI Marginalia
            </HandwrittenText>
          </div>
          <TypewriterText text={response.reflection} speed={25} />
        </ArtifactCard>
      </motion.div>

      <motion.div variants={fadeUp}>
        <ArtifactCard variant="pressed">
          <HandwrittenText as="h4" size="sm" color="herb-500" className="typewriter text-[10px] uppercase tracking-widest mb-2">
            Personal Reflection
          </HandwrittenText>
          <HandwrittenText size="base" className="text-ink-700 dark:text-ink-300 leading-relaxed">
            {response.fullReflection || response.reflection}
          </HandwrittenText>
        </ArtifactCard>
      </motion.div>

      <motion.div variants={fadeUp}>
        <ArtifactCard variant="specimen">
          <HandwrittenText as="h4" size="sm" color="ink-500" className="typewriter text-[10px] uppercase tracking-widest mb-2">
            Daily Affirmation
          </HandwrittenText>
          <HandwrittenText size="lg" className="text-ink-800 dark:text-ink-200 leading-relaxed">
            &ldquo;{response.affirmation}&rdquo;
          </HandwrittenText>
        </ArtifactCard>
      </motion.div>

      <InkDivider />

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
