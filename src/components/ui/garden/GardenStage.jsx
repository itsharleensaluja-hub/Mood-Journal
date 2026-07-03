import { motion } from 'framer-motion';

const stageSvg = {
  sprout: (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <motion.g
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <rect x="37" y="55" width="6" height="20" rx="3" fill="#A6CCA9" />
        <ellipse cx="40" cy="45" rx="10" ry="6" fill="#A6CCA9" opacity={0.6} />
        <ellipse cx="40" cy="40" rx="8" ry="5" fill="#D0E5D3" />
        <motion.circle
          cx="40" cy="38" r="3" fill="#C8E0CB"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.g>
    </svg>
  ),
  plant: (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <motion.g
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <rect x="37" y="40" width="6" height="35" rx="3" fill="#7A9E8A" />
        <ellipse cx="30" cy="48" rx="10" ry="5" fill="#A6CCA9" transform="rotate(-20 30 48)" />
        <ellipse cx="50" cy="42" rx="10" ry="5" fill="#C8E0CB" transform="rotate(15 50 42)" />
        <ellipse cx="40" cy="35" rx="8" ry="5" fill="#D0E5D3" />
        <motion.circle
          cx="40" cy="32" r="3" fill="#A6CCA9"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.g>
    </svg>
  ),
  bloom: (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <motion.g
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <rect x="37" y="35" width="6" height="40" rx="3" fill="#5E826E" />
        <ellipse cx="28" cy="45" rx="10" ry="4" fill="#A6CCA9" transform="rotate(-25 28 45)" />
        <ellipse cx="52" cy="40" rx="9" ry="4" fill="#C8E0CB" transform="rotate(20 52 40)" />
        <motion.g
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '40px 35px' }}
        >
          <ellipse cx="34" cy="28" rx="6" ry="8" fill="#F2D5CD" transform="rotate(-15 34 28)" />
          <ellipse cx="46" cy="28" rx="6" ry="8" fill="#F2D5CD" transform="rotate(15 46 28)" />
          <ellipse cx="40" cy="25" rx="7" ry="9" fill="#E8B8A8" />
          <circle cx="40" cy="27" r="3" fill="#D4796B" />
        </motion.g>
      </motion.g>
    </svg>
  ),
  flourish: (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <motion.g
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <rect x="37" y="25" width="6" height="50" rx="3" fill="#486856" />
        <ellipse cx="25" cy="42" rx="12" ry="5" fill="#A6CCA9" transform="rotate(-30 25 42)" />
        <ellipse cx="55" cy="36" rx="11" ry="5" fill="#C8E0CB" transform="rotate(25 55 36)" />
        <ellipse cx="40" cy="30" rx="10" ry="5" fill="#D0E5D3" transform="rotate(-5 40 30)" />
        <motion.g
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '40px 25px' }}
        >
          <ellipse cx="32" cy="18" rx="7" ry="9" fill="#F2D5CD" transform="rotate(-20 32 18)" />
          <ellipse cx="48" cy="18" rx="7" ry="9" fill="#F2D5CD" transform="rotate(20 48 18)" />
          <ellipse cx="40" cy="14" rx="8" ry="10" fill="#E8B8A8" />
          <circle cx="40" cy="16" r="3" fill="#D4796B" />
          <circle cx="36" cy="18" r="2" fill="#D4796B" opacity={0.6} />
          <circle cx="44" cy="18" r="2" fill="#D4796B" opacity={0.6} />
        </motion.g>
        <motion.circle
          cx="52" cy="45" r="3" fill="#D4796B"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        <motion.circle
          cx="28" cy="48" r="2.5" fill="#D4796B"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </motion.g>
    </svg>
  ),
};

export function GardenStage({ stage }) {
  if (!stage) return null;
  const svg = stageSvg[stage.id] || stageSvg.sprout;

  return (
    <div className="flex items-center justify-center" aria-label={`${stage.title} plant`}>
      <div className="relative">
        {svg}
        <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-16 h-1 bg-herb-200/50 dark:bg-herb-900/30 rounded-full blur-sm" aria-hidden="true" />
      </div>
    </div>
  );
}
