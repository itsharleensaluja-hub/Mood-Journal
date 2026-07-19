import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HandwrittenText } from '../archive/HandwrittenText';
import { Spinner } from '../common/Spinner';
import { COUNSELORS } from '../../data/counselors';
import { fadeUp } from '../../utils/animations';

export function StepConnecting({ anonymousId, onConnected }) {
  const [phase, setPhase] = useState('generating');
  const [counselor, setCounselor] = useState(null);

  useEffect(() => {
    let matched = null;
    const t1 = setTimeout(() => setPhase('searching'), 600);
    const t2 = setTimeout(() => {
      matched = COUNSELORS[Math.floor(Math.random() * COUNSELORS.length)];
      setCounselor(matched);
      setPhase('matched');
    }, 2400);
    const t3 = setTimeout(() => onConnected(matched || COUNSELORS[0]), 4000);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onConnected]);

  return (
    <motion.div
      variants={{ initial: {}, animate: { transition: { staggerChildren: 0.1 } } }}
      initial="initial"
      animate="animate"
      className="flex flex-col items-center justify-center py-12"
    >
      <motion.div variants={fadeUp} className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-plum-100/50 dark:bg-plum-900/30 border border-plum-200/50 dark:border-plum-700/30 mb-4">
          <span className="text-plum-400 text-sm">◇</span>
          <HandwrittenText size="sm" color="ink-500">Anonymous Session</HandwrittenText>
        </div>
        <HandwrittenText as="h1" size="xl" className="text-ink-900 dark:text-ink-100 mb-1">
          Your Anonymous ID
        </HandwrittenText>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="px-8 py-5 rounded-2xl bg-plum-500/5 dark:bg-plum-900/10 border border-plum-300/20 dark:border-plum-700/20 backdrop-blur-sm mb-8"
      >
        <span className="text-2xl font-mono tracking-[0.25em] text-plum-600 dark:text-plum-300 font-bold">
          {anonymousId}
        </span>
      </motion.div>

      <AnimatePresence mode="wait">
        {phase === 'generating' && (
          <motion.div key="gen" variants={fadeUp} initial="initial" animate="animate" exit={{ opacity: 0 }} className="text-center">
            <Spinner variant="dots" size="lg" />
            <p className="handwriting text-base text-ink-400 dark:text-ink-500 mt-4">
              Generating secure session...
            </p>
          </motion.div>
        )}

        {phase === 'searching' && (
          <motion.div key="search" variants={fadeUp} initial="initial" animate="animate" exit={{ opacity: 0 }} className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full border-2 border-plum-200 dark:border-plum-700" />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-plum-400 dark:border-t-plum-300"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl">🔍</span>
              </div>
            </div>
            <p className="handwriting text-base text-ink-600 dark:text-ink-400">
              Finding the best counselor...
            </p>
          </motion.div>
        )}

        {phase === 'matched' && counselor && (
          <motion.div
            key="match"
            variants={fadeUp}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-20 h-20 rounded-full bg-plum-100 dark:bg-plum-800 flex items-center justify-center mx-auto mb-4 border-2 border-plum-300 dark:border-plum-600"
            >
              <span className="text-2xl font-bold text-plum-500 dark:text-plum-300">{counselor.avatar}</span>
            </motion.div>
            <p className="handwriting text-lg text-ink-700 dark:text-ink-300 mb-1">
              {counselor.name} will join shortly
            </p>
            <p className="handwriting text-sm text-ink-400 dark:text-ink-500">
              {counselor.specialization}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
