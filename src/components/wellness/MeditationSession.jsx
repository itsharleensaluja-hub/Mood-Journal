import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HandwrittenText } from '../archive/HandwrittenText';
import { MEDITATION_SESSIONS } from '../../data/wellness';
import { fadeUp } from '../../utils/animations';

function createBellTone(ctx) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(880, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.5);
  gain.gain.setValueAtTime(0.2, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 1.5);
}

function createAmbientDrone(ctx) {
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(110, ctx.currentTime);
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(146.83, ctx.currentTime);
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(300, ctx.currentTime);
  gain.gain.setValueAtTime(0.08, ctx.currentTime);

  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc1.start();
  osc2.start();

  return { stop: () => { osc1.stop(); osc2.stop(); }, gain };
}

export function MeditationSession({ onBack }) {
  const [selection, setSelection] = useState(null);
  const [active, setActive] = useState(null);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [timer, setTimer] = useState(0);
  const ctxRef = useRef(null);
  const droneRef = useRef(null);
  const intervalRef = useRef(null);

  const session = selection ? MEDITATION_SESSIONS.find((s) => s.id === selection) : null;

  const cleanup = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (droneRef.current) { try { droneRef.current.stop(); } catch {} droneRef.current = null; }
    if (ctxRef.current) { try { ctxRef.current.close(); } catch {} ctxRef.current = null; }
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  useEffect(() => {
    if (active !== 'running' || !session) return;
    intervalRef.current = setInterval(() => {
      setTimer((t) => t + 1);
      setCountdown((c) => {
        if (c <= 1) {
          if (phaseIndex < session.phases.length - 1) {
            try { if (ctxRef.current) createBellTone(ctxRef.current); } catch {}
            setPhaseIndex((p) => p + 1);
            return session.phases[phaseIndex + 1].duration;
          }
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [active, session, phaseIndex]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  if (!selection) {
    return (
      <motion.div variants={fadeUp} initial="initial" animate="animate" className="max-w-lg mx-auto py-8">
        <button onClick={onBack} className="text-xs text-ink-400 dark:text-ink-500 hover:text-ink-600 dark:hover:text-ink-300 transition-colors mb-4">
          ← All modules
        </button>
        <HandwrittenText as="h2" size="xl" className="text-ink-900 dark:text-ink-100 mb-5 text-center">
          Choose Your Session
        </HandwrittenText>
        <div className="space-y-3">
          {MEDITATION_SESSIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    if (!s) return;
                    try {
                      const ctx = new (window.AudioContext || window.webkitAudioContext)();
                      ctx.resume();
                      ctxRef.current = ctx;
                      droneRef.current = createAmbientDrone(ctx);
                    } catch {}
                    setSelection(s.id);
                    setPhaseIndex(0);
                    setTimer(0);
                    setCountdown(s.phases[0].duration);
                    setActive('running');
                  }}
                  className="w-full text-left p-4 rounded-2xl bg-earth-50 dark:bg-ink-800/20 border border-earth-200 dark:border-ink-700/30 hover:border-herb-300 dark:hover:border-herb-600 transition-all duration-150 group"
            >
              <p className="handwriting text-base text-ink-700 dark:text-ink-300 group-hover:text-herb-600 dark:group-hover:text-herb-400 transition-colors">
                {s.name}
              </p>
              <p className="text-xs text-ink-400 dark:text-ink-500 mt-0.5">{s.description}</p>
              <div className="flex gap-3 mt-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-herb-100 dark:bg-herb-900/20 text-herb-500 dark:text-herb-400">
                  {s.duration >= 300 ? `${Math.floor(s.duration / 60)} min` : `${s.duration / 60} min`}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-plum-100 dark:bg-plum-900/20 text-plum-500 dark:text-plum-400">
                  {s.phases.length} phases
                </span>
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    );
  }

  if (active === 'running' && session) {
    const phase = session.phases[phaseIndex];
    const total = session.duration;
    const elapsed = timer;

    return (
      <motion.div variants={fadeUp} initial="initial" animate="animate" className="max-w-lg mx-auto py-4 text-center">
        <button onClick={() => { cleanup(); setActive(null); setSelection(null); }} className="text-xs text-ink-400 dark:text-ink-500 hover:text-ink-600 dark:hover:text-ink-300 transition-colors mb-6">
          ← End session
        </button>

        <div className="relative w-40 h-40 mx-auto mb-6">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" className="text-earth-200 dark:text-ink-700" strokeWidth="3" />
            <motion.circle
              cx="50" cy="50" r="42" fill="none"
              className="text-herb-400 dark:text-herb-400"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={264}
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: 264 * (1 - elapsed / total) }}
              transition={{ duration: 1, ease: 'linear' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-2xl text-herb-500 dark:text-herb-400 font-bold">{formatTime(countdown)}</span>
            <span className="text-[10px] text-ink-400 dark:text-ink-500 typewriter mt-0.5">remaining</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={phaseIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-herb-100/50 dark:bg-herb-900/20 border border-herb-200/30 dark:border-herb-700/20 mb-3">
              <span className="text-herb-400 text-xs">◉</span>
              <span className="text-[10px] text-herb-500 dark:text-herb-400 typewriter uppercase tracking-wider">
                {phase.label}
              </span>
            </div>
            <p className="text-sm text-ink-600 dark:text-ink-400 leading-relaxed max-w-sm mx-auto">
              {phase.instruction}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-center gap-1.5">
          {session.phases.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === phaseIndex ? 'bg-herb-400 scale-125' : i < phaseIndex ? 'bg-herb-300 dark:bg-herb-600' : 'bg-earth-200 dark:bg-ink-700'
              }`}
            />
          ))}
        </div>
      </motion.div>
    );
  }

  return null;
}
