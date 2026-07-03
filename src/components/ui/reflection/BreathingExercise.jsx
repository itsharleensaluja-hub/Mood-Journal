import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../../common/GlassCard';

export function BreathingExercise({ exercise }) {
  const [isActive, setIsActive] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const intervalRef = useRef(null);
  const phaseTimerRef = useRef(null);

  if (!exercise) return null;

  const phases = exercise.phases || [];
  const currentPhase = phases[phaseIndex] || phases[0];
  const scale = currentPhase?.scale || 1;

  const startExercise = useCallback(() => {
    setIsActive(true);
    setPhaseIndex(0);
    setTimeLeft(phases[0]?.duration || 4000);

    let phaseIdx = 0;
    const runPhase = () => {
      if (phaseIdx >= phases.length) phaseIdx = 0;
      setPhaseIndex(phaseIdx);
      setTimeLeft(phases[phaseIdx].duration);
      phaseTimerRef.current = setTimeout(() => {
        phaseIdx++;
        runPhase();
      }, phases[phaseIdx].duration);
    };
    runPhase();
  }, [phases]);

  const stopExercise = useCallback(() => {
    setIsActive(false);
    setPhaseIndex(0);
    setTimeLeft(0);
    if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current);
  }, []);

  useEffect(() => {
    return () => { if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current); };
  }, []);

  useEffect(() => {
    if (!isActive || !timeLeft) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 100));
    }, 100);
    return () => clearInterval(intervalRef.current);
  }, [isActive, timeLeft]);

  const progress = currentPhase ? 1 - (timeLeft / currentPhase.duration) : 0;

  return (
    <GlassCard padding="md" className="text-center">
      <h4 className="text-xs font-medium text-ink-500 dark:text-ink-400 uppercase tracking-wider mb-1">
        {exercise.name}
      </h4>
      <p className="text-xs text-ink-400 dark:text-ink-500 mb-4">
        {exercise.instruction}
      </p>

      <div className="relative w-24 h-24 mx-auto mb-3">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: isActive ? scale : 1 }}
            transition={{ duration: currentPhase?.duration ? currentPhase.duration / 1000 : 4, ease: 'easeInOut' }}
            className="w-16 h-16 rounded-full bg-plum-200 dark:bg-plum-700 opacity-50"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: isActive ? scale * 0.6 : 0.4 }}
            transition={{ duration: currentPhase?.duration ? currentPhase.duration / 1000 : 4, ease: 'easeInOut' }}
            className="w-10 h-10 rounded-full bg-herb-200 dark:bg-herb-700 opacity-40"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={phaseIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-xs font-medium text-ink-700 dark:text-ink-300"
            >
              {isActive ? (currentPhase?.label || 'Breathe') : 'Start'}
            </motion.span>
          </AnimatePresence>
        </div>

        {isActive && (
          <svg className="absolute inset-0 w-24 h-24 -rotate-90" viewBox="0 0 96 96">
            <circle cx="48" cy="48" r="44" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink-200 dark:text-ink-700" />
            <motion.circle
              cx="48" cy="48" r="44"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 44}
              animate={{ strokeDashoffset: 2 * Math.PI * 44 * (1 - progress) }}
              transition={{ duration: 0.1, ease: 'linear' }}
              className="text-plum-400"
            />
          </svg>
        )}
      </div>

      <button
        onClick={isActive ? stopExercise : startExercise}
        className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 active:scale-[0.97] ${
          isActive
            ? 'bg-clay-500 text-white hover:bg-clay-600'
            : 'bg-plum-500 text-white hover:bg-plum-600'
        }`}
      >
        {isActive ? 'Stop' : 'Start'}
      </button>
    </GlassCard>
  );
}
