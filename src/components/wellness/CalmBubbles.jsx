import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HandwrittenText } from '../archive/HandwrittenText';
import { Button } from '../common/Button';
import { fadeUp } from '../../utils/animations';

function createPopSound(ctx) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(600 + Math.random() * 400, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.08);
  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.12);
}

function createBubble(id) {
  return {
    id,
    x: Math.random() * 85 + 7.5,
    y: Math.random() * 40 + 55,
    size: 24 + Math.random() * 36,
    hue: Math.random() * 60 + 260,
    speed: 0.15 + Math.random() * 0.25,
    wobble: Math.random() * 20 + 10,
    phase: Math.random() * Math.PI * 2,
    opacity: 0.3 + Math.random() * 0.4,
  };
}

const COLORS = [
  { bg: 'bg-plum-100 dark:bg-plum-900/30', border: 'border-plum-300/40 dark:border-plum-600/30' },
  { bg: 'bg-herb-100 dark:bg-herb-900/30', border: 'border-herb-300/40 dark:border-herb-600/30' },
  { bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-brass-300/30 dark:border-brass-500/20' },
  { bg: 'bg-clay-100 dark:bg-clay-900/20', border: 'border-clay-300/30 dark:border-clay-700/20' },
];

export function CalmBubbles({ onBack }) {
  const [bubbles, setBubbles] = useState([]);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState('idle');
  const [timeLeft, setTimeLeft] = useState(60);
  const [msg, setMsg] = useState('');
  const ctxRef = useRef(null);
  const timerRef = useRef(null);
  const spawnRef = useRef(null);
  const idRef = useRef(0);

  const startGame = useCallback(() => {
    idRef.current = 0;
    setScore(0);
    setTimeLeft(60);
    setMsg('');
    const initial = Array.from({ length: 6 }, () => createBubble(idRef.current++));
    setBubbles(initial);
    setPhase('playing');
    try { ctxRef.current = new (window.AudioContext || window.webkitAudioContext)(); } catch {}
  }, []);

  useEffect(() => {
    if (phase !== 'playing') return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setPhase('done');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    spawnRef.current = setInterval(() => {
      setBubbles((prev) => [...prev.slice(-20), createBubble(idRef.current++)]);
    }, 1800);
    return () => { clearInterval(timerRef.current); clearInterval(spawnRef.current); };
  }, [phase]);

  useEffect(() => {
    if (phase !== 'playing') return;
    const move = setInterval(() => {
      setBubbles((prev) =>
        prev
          .map((b) => ({ ...b, y: b.y - b.speed * 0.6 }))
          .filter((b) => b.y > -10)
      );
    }, 50);
    return () => clearInterval(move);
  }, [phase]);

  const pop = useCallback((id) => {
    setBubbles((prev) => prev.filter((b) => b.id !== id));
    setScore((s) => s + 1);
    if (ctxRef.current) createPopSound(ctxRef.current);
  }, []);

  const calmRating = score <= 10 ? 'Very calm' : score <= 20 ? 'Peaceful' : score <= 35 ? 'Playful' : 'Energetic';
  const calmEmoji = score <= 10 ? '😌' : score <= 20 ? '🌿' : score <= 35 ? '✨' : '🌟';

  return (
    <motion.div variants={fadeUp} initial="initial" animate="animate" className="max-w-lg mx-auto py-4">
      <button onClick={onBack} className="text-xs text-ink-400 dark:text-ink-500 hover:text-ink-600 dark:hover:text-ink-300 transition-colors mb-4">
        ← All modules
      </button>

      {phase === 'idle' && (
        <div className="text-center py-8">
          <span className="text-5xl mb-4 block">🫧</span>
          <HandwrittenText as="h2" size="xl" className="text-ink-900 dark:text-ink-100 mb-2">
            Calm Bubbles
          </HandwrittenText>
          <HandwrittenText size="sm" color="ink-500" className="mb-2 block">
            Pop bubbles gently at your own pace. No rush, no pressure.
          </HandwrittenText>
          <p className="text-xs text-ink-400 dark:text-ink-500 mb-6">
            60 seconds · click each bubble once · listen to the gentle tone
          </p>
          <Button variant="primary" onClick={startGame}>
            Start
          </Button>
        </div>
      )}

      {phase === 'playing' && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-sm text-plum-500 dark:text-plum-300">Popped: {score}</span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-1.5 rounded-full bg-earth-200 dark:bg-ink-700">
                <div className="h-full rounded-full bg-herb-400 transition-all duration-1000" style={{ width: `${(timeLeft / 60) * 100}%` }} />
              </div>
              <span className="font-mono text-xs text-ink-400 dark:text-ink-500 w-8 text-right">{timeLeft}s</span>
            </div>
          </div>

          <div className="relative rounded-2xl bg-gradient-to-b from-plum-500/5 via-herb-500/5 to-plum-500/5 border border-plum-200/20 dark:border-plum-700/20 h-[400px] overflow-hidden">
            <AnimatePresence>
              {bubbles.map((b) => {
                const colorSet = COLORS[b.id % COLORS.length];
                return (
                  <motion.button
                    key={b.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: b.opacity,
                      left: `${b.x + Math.sin(Date.now() * 0.001 * b.speed + b.phase) * b.wobble * 0.01}%`,
                    }}
                    exit={{ scale: 1.3, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => pop(b.id)}
                    className={`absolute rounded-full ${colorSet.bg} ${colorSet.border} border backdrop-blur-sm cursor-pointer flex items-center justify-center transition-transform hover:scale-110`}
                    style={{
                      width: b.size,
                      height: b.size,
                      left: `${b.x}%`,
                      top: `${b.y}%`,
                      transform: `translate(-50%, -50%)`,
                    }}
                    aria-label="Pop bubble"
                  >
                    <span className="text-[10px] opacity-60 select-none" style={{ fontSize: Math.max(8, b.size * 0.3) }}>✦</span>
                  </motion.button>
                );
              })}
            </AnimatePresence>

            <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-earth-50 dark:from-ink-900 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-earth-50/80 dark:from-ink-900/80 to-transparent pointer-events-none" />
          </div>

          <p className="text-[10px] text-center text-ink-400 dark:text-ink-500 mt-2 typewriter">
            {timeLeft <= 15 ? 'Almost done... take your time.' : 'Pop gently. No rush.'}
          </p>
        </div>
      )}

      {phase === 'done' && (
        <div className="text-center py-8">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}>
            <span className="text-5xl mb-4 block">{calmEmoji}</span>
          </motion.div>
          <HandwrittenText as="h2" size="xl" className="text-ink-900 dark:text-ink-100 mb-1">
            {calmRating}
          </HandwrittenText>
          <p className="text-sm text-ink-500 dark:text-ink-400 mb-1">
            You popped <span className="text-plum-500 dark:text-plum-300 font-semibold">{score}</span> bubbles
          </p>
          <p className="text-xs text-ink-400 dark:text-ink-500 mb-6 leading-relaxed">
            {score <= 10 && "You took it slow — that's the spirit of mindful play."}
            {score > 10 && score <= 20 && 'A calm, steady pace. Your focus is gentle and present.'}
            {score > 20 && score <= 35 && 'Playful energy with mindful awareness. Nice balance.'}
            {score > 35 && 'Light and lively! Remember to breathe as you play.'}
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="secondary" onClick={startGame}>Play Again</Button>
            <Button variant="primary" onClick={onBack}>Back to Studio</Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
