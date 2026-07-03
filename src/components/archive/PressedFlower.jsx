import { motion } from 'framer-motion';

const flowerSvgs = {
  happy: {
    path: 'M12 2C12 2 14 7 14 10C14 13 12 16 12 16C12 16 10 13 10 10C10 7 12 2 12 2Z',
    petals: 5,
    color: '#FBBF24',
    leaf: 'M12 10Q18 8 20 6',
    stem: 'M12 10V18',
  },
  calm: {
    path: 'M12 3C12 3 16 8 16 12C16 16 12 19 12 19C12 19 8 16 8 12C8 8 12 3 12 3Z',
    petals: 6,
    color: '#6EE7B7',
    leaf: 'M12 12Q6 10 4 8',
    stem: 'M12 12V19',
  },
  neutral: {
    path: 'M12 4C12 4 14 9 14 12C14 15 12 17 12 17C12 17 10 15 10 12C10 9 12 4 12 4Z',
    petals: 4,
    color: '#9CA3AF',
    leaf: null,
    stem: 'M12 12V17',
  },
  sad: {
    path: 'M12 3C12 3 15 9 15 13C15 17 12 20 12 20C12 20 9 17 9 13C9 9 12 3 12 3Z',
    petals: 5,
    color: '#93C5FD',
    leaf: 'M12 14Q16 16 18 14',
    stem: 'M12 13V20',
  },
  angry: {
    path: 'M12 2C12 2 17 7 17 11C17 15 12 18 12 18C12 18 7 15 7 11C7 7 12 2 12 2Z',
    petals: 6,
    color: '#FCA5A5',
    leaf: null,
    stem: 'M12 11V18',
  },
  anxious: {
    path: 'M12 3.5C12 3.5 14 8 14 11.5C14 15 12 17.5 12 17.5C12 17.5 10 15 10 11.5C10 8 12 3.5 12 3.5Z',
    petals: 4,
    color: '#C4B5FD',
    leaf: 'M12 11Q8 10 6 11.5',
    stem: 'M12 11.5V17.5',
  },
  excited: {
    path: 'M12 1.5C12 1.5 16 7 16 11C16 15 12 18.5 12 18.5C12 18.5 8 15 8 11C8 7 12 1.5 12 1.5Z',
    petals: 7,
    color: '#F9A8D4',
    leaf: 'M12 12Q17 13 19 11',
    stem: 'M12 11V18.5',
  },
};

export function PressedFlower({ moodId, size = 'md', selected = false, onClick, ...props }) {
  const flower = flowerSvgs[moodId] || flowerSvgs.neutral;
  const sizeClasses = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-14 h-14' };

  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      className={`relative ${sizeClasses[size] || sizeClasses.md} flex items-center justify-center rounded-full transition-all duration-300 focus-ring ${selected ? 'bg-ink-100 dark:bg-ink-700/50 shadow-inner' : 'hover:bg-ink-50/50 dark:hover:bg-ink-800/30'}`}
      aria-label={moodId}
      {...props}
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={flower.path} fill={flower.color} opacity={selected ? 1 : 0.7} />
        {flower.leaf && (
          <path d={flower.leaf} stroke={flower.color} strokeWidth="1.5" strokeLinecap="round" opacity={selected ? 0.8 : 0.5} />
        )}
        <path d={flower.stem} stroke={flower.color} strokeWidth="1.5" strokeLinecap="round" opacity={selected ? 0.6 : 0.3} />
      </svg>
      {selected && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-brass-400 border border-brass-300 shadow-sm"
        />
      )}
    </motion.button>
  );
}
