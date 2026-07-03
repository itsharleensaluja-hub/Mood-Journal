import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArtifactCard } from '../archive/ArtifactCard';
import { useJournal } from '../../context/JournalContext';
import { getGardenStage, getNextStage, getProgressToNextStage } from '../../data/gardenStages';
import { HandwrittenText } from '../archive/HandwrittenText';

function GlassCloche({ stage }) {
  const stageColors = {
    sprout: { flower: '#A7F3D0', stem: '#6EE7B7', glow: 'rgba(167,243,208,0.15)' },
    plant: { flower: '#6EE7B7', stem: '#34D399', glow: 'rgba(110,231,183,0.15)' },
    bloom: { flower: '#F9A8D4', stem: '#F472B6', glow: 'rgba(249,168,212,0.15)' },
    flourish: { flower: '#34D399', stem: '#10B981', glow: 'rgba(52,211,153,0.15)' },
  };
  const colors = stageColors[stage?.id] || stageColors.sprout;

  return (
    <div className="relative w-32 h-36 sm:w-40 sm:h-44 mx-auto">
      <svg viewBox="0 0 160 180" className="w-full h-full" fill="none">
        <defs>
          <radialGradient id="clocheGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor={colors.glow} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect x="40" y="140" width="80" height="12" rx="2" fill="#8B5E3C" opacity="0.6" />
        <path d="M45 140 Q45 60 80 30 Q115 60 115 140" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <path d="M48 138 Q48 65 80 35 Q112 65 112 138" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3 3" />
        <rect x="42" y="136" width="76" height="2" rx="1" fill="#C9A84C" opacity="0.4" />
        <rect x="140" y="38" width="18" height="6" rx="1" fill="#7A4E30" opacity="0.5" transform="rotate(15 140 38)" />
        <rect x="142" y="44" width="16" height="3" rx="1" fill="#B8943E" opacity="0.4" transform="rotate(15 142 44)" />
        <rect x="2" y="38" width="18" height="6" rx="1" fill="#7A4E30" opacity="0.5" transform="rotate(-15 2 38)" />
        <rect x="4" y="44" width="16" height="3" rx="1" fill="#B8943E" opacity="0.4" transform="rotate(-15 4 44)" />
        <rect x="79" y="135" width="2" height="8" rx="1" fill="#5C3A24" />
        <ellipse cx="80" cy="135" rx="20" ry="3" fill={colors.glow} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center" style={{ top: '-5%' }}>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-radial from-transparent to-transparent blur-xl" style={{ background: colors.glow, width: '60px', height: '60px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
          <motion.span
            className="text-3xl sm:text-4xl block"
            animate={{ scale: [1, 1.06, 1], rotate: [-1, 1, -1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {stage?.emoji || '🌱'}
          </motion.span>
        </div>
      </div>
    </div>
  );
}

export function DeskTerrarium() {
  const { stats } = useJournal();
  const streak = stats?.streak?.current || 0;
  const currentStage = getGardenStage(streak);
  const progress = useMemo(() => getProgressToNextStage(streak), [streak]);
  const nextStage = useMemo(() => getNextStage(streak), [streak]);

  return (
    <ArtifactCard variant="specimen">
      <HandwrittenText as="h2" size="lg" color="herb-500" className="mb-2 text-center">
        Desk Terrarium
      </HandwrittenText>
      {!currentStage ? (
        <div className="text-center py-4">
          <span className="text-3xl block mb-2">🌱</span>
          <HandwrittenText size="sm" color="ink-600">Start journaling to grow your terrarium</HandwrittenText>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <GlassCloche stage={currentStage} />
          <HandwrittenText size="lg" className="mt-2 text-ink-800 dark:text-ink-200">
            {currentStage.emoji} {currentStage.title}
          </HandwrittenText>
          <HandwrittenText size="sm" color="ink-600" className="text-center mb-3">
            {currentStage.message}
          </HandwrittenText>
          {nextStage && nextStage.id !== currentStage.id && (
            <div className="w-full max-w-xs">
              <div className="flex justify-between text-[10px] typewriter text-ink-400 dark:text-ink-500 mb-1">
                <span>to {nextStage.title}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-1.5 bg-earth-200 dark:bg-ink-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, progress)}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full rounded-full bg-herb-400 dark:bg-herb-500"
                />
              </div>
              <HandwrittenText size="xs" color="ink-500" className="mt-1">
                {nextStage.minStreak - streak} more days
              </HandwrittenText>
            </div>
          )}
        </div>
      )}
    </ArtifactCard>
  );
}
