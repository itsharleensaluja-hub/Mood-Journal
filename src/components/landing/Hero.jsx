import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HandwrittenText } from '../archive/HandwrittenText';
import { PressedFlower } from '../archive/PressedFlower';
import { DeskLamp } from '../archive/DeskLamp';
import { AppLogo } from '../ui/AppLogo';
import { MOODS, getMoodById } from '../../data/moods';
import { PREVIEW_WEEKLY } from '../../data/landing';
import { ClosedJournalCover } from './ClosedJournalCover';
import { FountainPen } from './FountainPen';

const easing = [0.22, 1, 0.36, 1];

function NotebookPreview() {
  return (
    <div className="relative rounded-xl bg-gradient-to-b from-paper-100 to-paper-50 dark:from-ink-800/60 dark:to-ink-900/60 border border-earth-300 dark:border-ink-700 shadow-depth overflow-hidden"
      style={{ minHeight: '340px' }}
    >
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-px w-px bg-ink-200/40 dark:bg-ink-700/40" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="p-5 sm:p-7">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-brass-400">◈</span>
            <HandwrittenText size="sm" color="ink-500">Select your mood</HandwrittenText>
          </div>
          <div className="flex flex-wrap gap-3">
            {MOODS.slice(0, 5).map((mood) => (
              <div key={mood.id} className="flex flex-col items-center gap-1">
                <PressedFlower moodId={mood.id} size="md" />
                <HandwrittenText size="xs" color="ink-400">{mood.label}</HandwrittenText>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-brass-400">✦</span>
              <HandwrittenText size="sm" color="ink-500">Today's entry</HandwrittenText>
            </div>
            <div className="relative pl-4 border-l-2 border-ink-200/50 dark:border-ink-700/50">
              <HandwrittenText size="sm" className="text-ink-700 dark:text-ink-300 leading-relaxed">
                &ldquo;Feeling calm after a productive morning. Finished the report ahead of schedule.&rdquo;
              </HandwrittenText>
              <HandwrittenText size="xs" color="ink-400" className="mt-1 block">2:30 PM · Calm</HandwrittenText>
            </div>
          </div>
        </div>
        <div className="p-5 sm:p-7 bg-paper-50/50 dark:bg-ink-900/30">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-plum-400">✦</span>
            <HandwrittenText size="sm" color="plum-500">Marginalia</HandwrittenText>
          </div>
          <div className="p-4 rounded-lg bg-plum-50/30 dark:bg-plum-900/10 border border-plum-200/40 dark:border-plum-800/30 border-l-[3px] border-l-plum-400/60 mb-4">
            <HandwrittenText size="xs" color="plum-600" className="typewriter text-[9px] uppercase tracking-widest mb-1">AI Note</HandwrittenText>
            <HandwrittenText size="sm" className="text-ink-600 dark:text-ink-400 italic">
              Calm days are increasing. Your meditation practice is showing results.
            </HandwrittenText>
          </div>
          <div className="flex items-end justify-between gap-1 h-12 mb-2">
            {PREVIEW_WEEKLY.map((d, i) => {
              const mood = getMoodById(['happy','calm','calm','happy','sad','anxious','calm'][i]);
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                  <span className="text-[9px]">{d.emoji}</span>
                  <div
                    className="w-full rounded-sm"
                    style={{
                      height: `${(d.value / 90) * 100}%`,
                      minHeight: '3px',
                      background: `linear-gradient(to top, ${mood?.color || '#A6CCA9'}, ${mood?.color || '#A6CCA9'}dd)`,
                    }}
                  />
                </div>
              );
            })}
          </div>
          <HandwrittenText size="xs" color="ink-400" className="text-center block">This week</HandwrittenText>
        </div>
      </div>
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-px w-[2px] shadow-inner" aria-hidden="true" />
    </div>
  );
}

export function Hero() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState('idle'); // idle | opening | open

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpen = () => {
    if (phase !== 'idle') return;
    setPhase('opening');
    setTimeout(() => setPhase('open'), 1100);
  };

  const handleNavigate = () => {
    if (phase === 'open') {
      navigate('/dashboard');
    } else {
      handleOpen();
    }
  };

  const isOpen = phase !== 'idle';

  return (
    <section id="preview" className="pt-36 pb-24 sm:pt-44 sm:pb-32 px-6 overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-brass-400/3 to-transparent pointer-events-none" />
      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easing }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-earth-200/50 dark:bg-ink-800/40 border border-earth-300/50 dark:border-ink-700/50 mb-5">
            <AppLogo variant="symbol" size="xs" className="text-brass-400" />
            <HandwrittenText size="sm" color="ink-500">The Living Archive</HandwrittenText>
          </div>

          <h1 className="text-[3rem] sm:text-[4rem] md:text-[5rem] font-bold text-ink-900 dark:text-ink-100 leading-[0.95] tracking-[-0.04em] mb-5">
            Your emotional<br />
            <span className="text-plum-500" style={{ fontFamily: '"Caveat", cursive', fontWeight: 400, letterSpacing: 0 }}>archive</span>
            <span className="text-ink-800 dark:text-ink-200"> comes alive</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easing, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-14"
        >
          <button
            onClick={handleNavigate}
            className="group handwriting text-lg px-8 py-3 bg-ink-800 hover:bg-ink-900 dark:bg-ink-100 dark:hover:bg-ink-200 text-paper-100 dark:text-ink-900 rounded-lg transition-all duration-150 active:scale-[0.97] shadow-sm hover:shadow-lg focus-ring"
          >
            <span className="inline-flex items-center gap-2">
              {phase === 'open' ? 'Enter the archive' : 'Open the journal'}
              {phase === 'open' && (
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="inline-block"
                >
                  →
                </motion.span>
              )}
            </span>
          </button>

          <button
            onClick={() => scrollTo('features')}
            className="handwriting text-lg px-8 py-3 border border-ink-300 dark:border-ink-600 text-ink-600 dark:text-ink-300 rounded-lg hover:bg-earth-100 dark:hover:bg-ink-800 transition-all duration-150 focus-ring"
          >
            Browse the archive
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easing, delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <div className="desk-surface-hero p-6 sm:p-8">
            <DeskLamp className="opacity-30 dark:opacity-20" />

            <div className="relative max-w-lg mx-auto">
              <NotebookPreview />

              <div className="absolute inset-0 rounded-xl pointer-events-none" style={{ zIndex: 1 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-xl"
                    style={{
                      background: 'linear-gradient(to bottom, #FDF8F0, #FAF5ED)',
                      border: '1px solid rgba(237, 229, 218, 0.4)',
                      top: `${3 + i * 1.5}px`,
                      right: `${3 + i * 1.5}px`,
                      bottom: `${3 + i * 1.5}px`,
                      left: `${8 + i * 1.5}px`,
                      zIndex: 9 - i,
                    }}
                  />
                ))}
              </div>

              <ClosedJournalCover isOpen={isOpen} onOpen={handleOpen} />

              {isOpen && (
                <motion.div
                  className="absolute -bottom-3 -right-3 z-20 pointer-events-none"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  <PressedFlower moodId="calm" size="sm" />
                </motion.div>
              )}
            </div>

            <FountainPen className="absolute -bottom-2 right-6 sm:right-12 opacity-70" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
