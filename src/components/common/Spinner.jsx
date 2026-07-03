import { motion } from 'framer-motion';

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

export function Spinner({ size = 'md', variant = 'ring', className = '' }) {
  if (variant === 'dots') {
    return (
      <div className={`flex items-center justify-center gap-1.5 ${className}`} role="status" aria-busy="true" aria-label="Loading">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ y: [-6, 0, -6], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.12 }}
            className={`rounded-full bg-plum-400 dark:bg-plum-300 ${sizes[size] || sizes.md}`}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${className}`} role="status" aria-busy="true" aria-label="Loading">
      <motion.div
        className={`rounded-full border-2 border-ink-200 dark:border-ink-700 border-t-plum-400 dark:border-t-plum-300 ${sizes[size] || sizes.md}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}
