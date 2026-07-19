import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DeskLamp } from '../components/archive/DeskLamp';
import { WellnessHub } from '../components/wellness/WellnessHub';
import { QuizAssessment } from '../components/wellness/QuizAssessment';
import { MeditationSession } from '../components/wellness/MeditationSession';
import { CalmBubbles } from '../components/wellness/CalmBubbles';
import { MoodMusic } from '../components/wellness/MoodMusic';
import { staggerContainer } from '../utils/animations';

export function WellnessPage() {
  const [module, setModule] = useState(null);

  const handleBack = useCallback(() => setModule(null), []);

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="pb-8 relative"
    >
      <DeskLamp />

      <AnimatePresence mode="wait">
        {!module && (
          <motion.div key="hub" exit={{ opacity: 0, y: -10 }}>
            <WellnessHub onSelect={setModule} />
          </motion.div>
        )}
        {module === 'quiz' && (
          <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <QuizAssessment onBack={handleBack} />
          </motion.div>
        )}
        {module === 'meditation' && (
          <motion.div key="meditation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <MeditationSession onBack={handleBack} />
          </motion.div>
        )}
        {module === 'game' && (
          <motion.div key="game" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CalmBubbles onBack={handleBack} />
          </motion.div>
        )}
        {module === 'music' && (
          <motion.div key="music" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <MoodMusic onBack={handleBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
