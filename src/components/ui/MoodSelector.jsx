import { motion } from 'framer-motion';
import { MOODS } from '../../data/moods';
import { GlassCard } from '../common/GlassCard';
import { useJournal } from '../../context/JournalContext';

export function MoodSelector() {
  const { currentMood, selectMood } = useJournal();

  return (
    <GlassCard padding="md">
      <h2 className="text-sm font-medium text-ink-700 dark:text-ink-300 mb-4">
        How are you feeling?
      </h2>

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none" role="radiogroup" aria-label="Mood selection">
        {MOODS.map((mood) => {
          const isSelected = currentMood === mood.id;

          return (
            <motion.button
              key={mood.id}
              role="radio"
              aria-checked={isSelected}
              aria-label={mood.label}
              onClick={() => selectMood(mood.id)}
              whileTap={{ scale: 0.93 }}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-lg whitespace-nowrap
                transition-all duration-150 focus-ring flex-shrink-0
                ${isSelected
                  ? 'bg-plum-100 text-plum-700 dark:bg-plum-900/30 dark:text-plum-300'
                  : 'bg-earth-100/50 text-ink-500 hover:bg-earth-200 dark:bg-ink-800/30 dark:text-ink-400 dark:hover:bg-ink-800/50'
                }
              `}
            >
              <motion.span
                className="text-lg leading-none"
                animate={isSelected ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {mood.emoji}
              </motion.span>
              <span className="text-sm font-medium">{mood.label}</span>
            </motion.button>
          );
        })}
      </div>
    </GlassCard>
  );
}
