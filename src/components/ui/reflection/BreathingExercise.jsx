import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArtifactCard } from '../../archive/ArtifactCard';
import { HandwrittenText } from '../../archive/HandwrittenText';

export function BreathingExercise({ exercise }) {
  const [isActive, setIsActive] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const intervalRef = useRef(null);
  const phaseTimerRef = useRef(null);

  const phases = exercise?.phases || [];
  const currentPhase = phases[phaseIndex] || phases[0];

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
    if (!isActive) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 100));
    }, 100);
    return () => clearInterval(intervalRef.current);
  }, [isActive]);

  if (!exercise) return null;

  const progress = currentPhase ? 1 - (timeLeft / currentPhase.duration) : 0;
  const flameScale = isActive ? (currentPhase?.scale || 1) * 0.6 : 0.6;

  return (
    <ArtifactCard variant="specimen" className="text-center">
      <HandwrittenText as="h4" size="sm" color="ink-500" className="typewriter text-[10px] uppercase tracking-widest mb-1">
        {exercise.name}
      </HandwrittenText>
      <HandwrittenText size="xs" color="ink-500" className="mb-4">
        {exercise.instruction}
      </HandwrittenText>

      <div className="relative w-28 h-28 mx-auto mb-3">
        <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
          <rect x="55" y="85" width="10" height="20" rx="3" fill="#8B5E3C" opacity="0.6" />
          <ellipse cx="60" cy="85" rx="18" ry="4" fill="#5C3A24" opacity="0.3" />
          <motion.g
            animate={{ scale: flameScale }}
            transition={{ duration: currentPhase?.duration ? currentPhase.duration / 1000 : 4, ease: 'easeInOut' }}
            style={{ transformOrigin: '60px 60px' }}
          >
            <path d="M60 20 Q72 45 70 60 Q68 75 60 70 Q52 75 50 60 Q48 45 60 20Z" fill="#FBBF24" opacity={0.8} />
            <path d="M60 25 Q68 45 66 58 Q64 68 60 65 Q56 68 54 58 Q52 45 60 25Z" fill="#FDE68A" opacity={0.9} />
            <path d="M60 30 Q65 45 63 55 Q61 62 60 60 Q59 62 57 55 Q55 45 60 30Z" fill="#FEF3C7" />
            <motion.circle
              cx="60" cy="32" r="3" fill="#FFF"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.g>
          <motion.path
            d="M60 72 Q66 68 72 70"
            stroke="#FBBF24"
            strokeWidth="1"
            fill="none"
            animate={{ opacity: isActive ? [0.2, 0.5, 0.2] : 0.2 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>

        {isActive && (
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink-200 dark:text-ink-700" />
            <motion.circle
              cx="60" cy="60" r="50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 50}
              animate={{ strokeDashoffset: 2 * Math.PI * 50 * (1 - progress) }}
              transition={{ duration: 0.1, ease: 'linear' }}
              className="text-brass-400"
            />
          </svg>
        )}

        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={phaseIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="handwriting text-sm text-ink-700 dark:text-ink-300"
            >
              {isActive ? (currentPhase?.label || 'Breathe') : 'Start'}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <button
        onClick={isActive ? stopExercise : startExercise}
        className={`handwriting text-base px-5 py-1.5 rounded-lg transition-all duration-150 active:scale-[0.97] focus-ring ${
          isActive
            ? 'bg-clay-500/10 text-clay-600 dark:text-clay-400 border border-clay-300/30'
            : 'bg-brass-400/20 text-ink-700 dark:text-ink-300 border border-brass-400/30'
        }`}
      >
        {isActive ? 'Extinguish' : 'Light candle'}
      </button>
    </ArtifactCard>
  );
}
