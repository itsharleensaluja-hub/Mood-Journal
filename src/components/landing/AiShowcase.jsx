import { motion } from 'framer-motion';
import { getMoodById } from '../../data/moods';
import { AI_SHOWCASE } from '../../data/landing';
import { HandwrittenText } from '../archive/HandwrittenText';

const easing = [0.22, 1, 0.36, 1];

function PageTurnConnector() {
  return (
    <div className="flex flex-col items-center py-4" aria-hidden="true">
      <div className="w-[3px] h-10 rounded-full bg-ink-200 dark:bg-ink-700" />
      <div className="w-2 h-2 rounded-full bg-brass-400 mt-[-2px]" />
      <div className="w-4 h-[2px] rounded-full bg-ink-300 dark:bg-ink-600 mt-1 rotate-12" />
    </div>
  );
}

const cards = [
  {
    id: 'entry',
    content: (mood, data) => (
      <div className="rounded-xl bg-paper-100 dark:bg-ink-800/50 border border-earth-300 dark:border-ink-700 p-6 sm:p-7 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <motion.span
            className="text-lg"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            {mood?.emoji}
          </motion.span>
          <div>
            <HandwrittenText size="sm" className="text-ink-800 dark:text-ink-200">{mood?.label}</HandwrittenText>
            <HandwrittenText size="xs" color="ink-400">{data.time}</HandwrittenText>
          </div>
          <span className="ml-auto typewriter text-[10px] text-brass-400 uppercase tracking-wider">p. 1</span>
        </div>
        <div className="pl-4 border-l-2 border-ink-200/50 dark:border-ink-700/50">
          <HandwrittenText size="sm" className="text-ink-700 dark:text-ink-300 leading-relaxed">
            &ldquo;{data.entry}&rdquo;
          </HandwrittenText>
        </div>
      </div>
    ),
  },
  {
    id: 'reflection',
    content: (mood, data) => (
      <div className="rounded-xl p-6 bg-plum-50/30 dark:bg-plum-900/10 border border-plum-200 dark:border-plum-800/40 border-l-[3px] border-l-plum-400 shadow-sm">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-plum-400 text-sm">✦</span>
          <HandwrittenText size="xs" color="plum-600" className="typewriter text-[9px] uppercase tracking-widest">AI Marginalia</HandwrittenText>
        </div>
        <div className="relative pl-3">
          <span className="absolute left-0 top-0 text-lg text-plum-300 leading-none">"</span>
          <HandwrittenText size="sm" className="text-ink-600 dark:text-ink-400 italic leading-relaxed pl-4">
            {data.reflection}
          </HandwrittenText>
        </div>
      </div>
    ),
  },
  {
    id: 'trend',
    content: (mood, data) => (
      <div className="rounded-xl bg-paper-100 dark:bg-ink-800/50 border border-earth-300 dark:border-ink-700 p-6 shadow-sm">
        <HandwrittenText size="xs" color="ink-500" className="typewriter text-[9px] uppercase tracking-widest mb-3">Ribbon Timeline</HandwrittenText>
        <div className="flex items-center gap-4">
          <div className="flex items-end gap-1 h-14">
            {[40, 55, 50, 65, 70, 80, 85].map((h, i) => (
              <div
                key={i}
                className="w-4 rounded-sm"
                style={{
                  height: `${h}%`,
                  minHeight: '4px',
                  background: `linear-gradient(to top, #A6CCA9, #C8E0CB)`,
                }}
              />
            ))}
          </div>
          <div>
            <HandwrittenText size="xl" className="text-herb-600 dark:text-herb-400">+{data.trendPercentage}%</HandwrittenText>
            <HandwrittenText size="xs" color="ink-500">{data.trendLabel}</HandwrittenText>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'insight',
    content: (mood, data) => (
      <div className="rounded-xl p-6 bg-amber-50/30 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 border-l-[3px] border-l-amber-400 shadow-sm">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-sm">◇</span>
          <HandwrittenText size="xs" color="ink-500" className="typewriter text-[9px] uppercase tracking-widest">Personal Insight</HandwrittenText>
        </div>
        <HandwrittenText size="sm" className="text-ink-700 dark:text-ink-300 leading-relaxed">
          {data.insight}
        </HandwrittenText>
      </div>
    ),
  },
];

export function AiShowcase() {
  const mood = getMoodById(AI_SHOWCASE.moodId);

  return (
    <section className="py-28 sm:py-36 px-6 bg-earth-200/50 dark:bg-ink-800/20">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: easing }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-earth-200/50 dark:bg-ink-800/40 border border-earth-300/50 dark:border-ink-700/50 mb-4">
            <span className="text-plum-400 text-sm">✦</span>
            <HandwrittenText size="sm" color="plum-500">Marginalia in action</HandwrittenText>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-ink-900 dark:text-ink-100">
            Quiet intelligence
          </h2>
          <HandwrittenText size="base" color="ink-500" className="mt-3 block">
            AI notes in the margin of your journal
          </HandwrittenText>
        </motion.div>

        <div className="flex flex-col">
          {cards.map((card, i) => (
            <div key={card.id}>
              {i > 0 && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.3, ease: easing, delay: 0.1 }}
                  style={{ transformOrigin: 'top' }}
                >
                  <PageTurnConnector />
                </motion.div>
              )}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: easing, delay: 0.15 }}
              >
                {card.content(mood, AI_SHOWCASE)}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
