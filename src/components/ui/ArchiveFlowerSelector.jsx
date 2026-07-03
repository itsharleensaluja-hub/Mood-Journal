import { motion } from 'framer-motion';
import { MOODS } from '../../data/moods';
import { PressedFlower } from '../archive/PressedFlower';
import { useJournal } from '../../context/JournalContext';
import { ArtifactCard } from '../archive/ArtifactCard';
import { HandwrittenText } from '../archive/HandwrittenText';

export function ArchiveFlowerSelector() {
  const { currentMood, selectMood } = useJournal();

  return (
    <ArtifactCard variant="cabinet">
      <HandwrittenText as="h2" size="lg" color="ink-700" className="mb-4">
        How are you feeling?
      </HandwrittenText>
      <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Mood selection">
        {MOODS.map((mood) => {
          const isSelected = currentMood === mood.id;
          return (
            <motion.div
              key={mood.id}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-1"
            >
              <PressedFlower
                moodId={mood.id}
                size="lg"
                selected={isSelected}
                onClick={() => selectMood(mood.id)}
                role="radio"
                aria-checked={isSelected}
                aria-label={mood.label}
              />
              <HandwrittenText
                size="xs"
                color={isSelected ? 'ink-800' : 'ink-600'}
                className={isSelected ? 'font-bold' : ''}
              >
                {mood.label}
              </HandwrittenText>
            </motion.div>
          );
        })}
      </div>
    </ArtifactCard>
  );
}
