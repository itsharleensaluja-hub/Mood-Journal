import { motion } from 'framer-motion';
import { HandwrittenText } from '../archive/HandwrittenText';
import { GARDEN_STAGES, getGardenStage, getNextStage, getProgressToNextStage } from '../../data/gardenStages';
import { GARDEN_SHOWCASE } from '../../data/landing';

const easing = [0.22, 1, 0.36, 1];

function GlassTerrarium({ stage }) {
  return (
    <div className="relative w-40 h-44 sm:w-48 sm:h-52 mx-auto">
      <svg viewBox="0 0 160 180" className="w-full h-full" fill="none">
        <defs>
          <radialGradient id="showcaseGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="rgba(167,243,208,0.12)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect x="40" y="140" width="80" height="12" rx="2" fill="#8B5E3C" opacity="0.5" />
        <path d="M45 140 Q45 60 80 30 Q115 60 115 140" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
        <rect x="42" y="136" width="76" height="2" rx="1" fill="#C9A84C" opacity="0.3" />
        <rect x="79" y="135" width="2" height="8" rx="1" fill="#5C3A24" />
        <ellipse cx="80" cy="135" rx="20" ry="3" fill="url(#showcaseGlow)" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center" style={{ top: '-5%' }}>
        <motion.span
          className="text-4xl sm:text-5xl block"
          animate={{ scale: [1, 1.06, 1], rotate: [-1, 1, -1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {stage?.emoji || '🌱'}
        </motion.span>
      </div>
    </div>
  );
}

function GrowthPath({ stages, activeId }) {
  return (
    <div className="flex items-center justify-between w-full max-w-md mx-auto">
      {stages.map((stage, i) => {
        const isActive = stage.id === activeId;
        const isPast = stages.findIndex(s => s.id === activeId) > i;
        return (
          <div key={stage.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <span className={`text-xl transition-all duration-300 ${isActive ? 'scale-125 drop-shadow-sm' : isPast ? 'opacity-60' : 'opacity-30'}`}>
                {stage.emoji}
              </span>
              <HandwrittenText size="xs" color={isActive ? 'herb-600' : 'ink-400'} className={isActive ? 'font-bold' : ''}>
                {stage.title}
              </HandwrittenText>
            </div>
            {i < stages.length - 1 && (
              <div className={`w-6 sm:w-10 h-[3px] mx-1 rounded-full ${isPast || isActive ? 'bg-herb-300 dark:bg-herb-600' : 'bg-ink-200 dark:bg-ink-700'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function EmotionGardenShowcase() {
  const { streak, currentStageId } = GARDEN_SHOWCASE;
  const currentStage = getGardenStage(streak);
  const nextStage = getNextStage(streak);
  const progressToNext = getProgressToNextStage(streak);

  return (
    <section id="garden" className="py-28 sm:py-36 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: easing }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-earth-200/50 dark:bg-ink-800/40 border border-earth-300/50 dark:border-ink-700/50 mb-4">
            <span className="text-herb-400 text-sm">🌱</span>
            <HandwrittenText size="sm" color="herb-500">The Terrarium</HandwrittenText>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-ink-900 dark:text-ink-100">
            Your garden grows with you
          </h2>
          <HandwrittenText size="base" color="ink-500" className="mt-3 block">
            A living terrarium on your desk
          </HandwrittenText>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: easing }}
          className="rounded-xl p-8 sm:p-10 bg-paper-100 dark:bg-ink-800/40 border border-earth-300 dark:border-ink-700 shadow-depth hover:shadow-floating transition-shadow duration-500"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="mb-6">
              <GlassTerrarium stage={currentStage} />
            </div>
            <HandwrittenText as="h3" size="xl" className="text-ink-800 dark:text-ink-200 mb-1">
              {currentStage?.emoji} {currentStage?.title}
            </HandwrittenText>
            <HandwrittenText size="sm" color="ink-500" className="text-center">
              {currentStage?.message}
            </HandwrittenText>
          </div>

          <GrowthPath stages={GARDEN_STAGES} activeId={currentStageId} />

          <div className="mt-8 pt-6 border-t border-earth-200 dark:border-ink-700">
            <div className="flex items-center justify-center gap-8 sm:gap-12">
              <div className="text-center">
                <HandwrittenText size="xl" className="text-herb-600 dark:text-herb-400">{streak}</HandwrittenText>
                <HandwrittenText size="xs" color="ink-500">Day streak</HandwrittenText>
              </div>
              {nextStage?.id !== currentStage?.id && (
                <div className="text-center">
                  <div className="text-2xl">{nextStage?.emoji}</div>
                  <HandwrittenText size="xs" color="ink-500">{nextStage?.title} in {nextStage?.minStreak - streak}d</HandwrittenText>
                </div>
              )}
              <div className="text-center">
                <HandwrittenText size="xl" className="text-plum-500">{Math.round(progressToNext)}%</HandwrittenText>
                <HandwrittenText size="xs" color="ink-500">Progress</HandwrittenText>
              </div>
            </div>
            <div className="mt-4 w-full h-2 bg-earth-200 dark:bg-ink-700 rounded-full overflow-hidden max-w-xs mx-auto">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.min(100, progressToNext)}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(to right, #A6CCA9, #5E826E)' }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
