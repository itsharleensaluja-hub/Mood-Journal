import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArtifactCard } from '../../archive/ArtifactCard';
import { HandwrittenText } from '../../archive/HandwrittenText';

export function GoalInput({ suggestedGoal, onSave }) {
  const [goal, setGoal] = useState(suggestedGoal || '');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    if (!goal.trim()) return;
    onSave?.(goal.trim());
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <ArtifactCard variant="pressed">
      <HandwrittenText as="h4" size="sm" color="ink-500" className="typewriter text-[10px] uppercase tracking-widest mb-3">
        Tomorrow's Intention
      </HandwrittenText>

      <input
        type="text"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSave()}
        placeholder={suggestedGoal || 'Set an intention for tomorrow...'}
        aria-label="Set tomorrow's intention"
        className="w-full bg-transparent border-b-2 border-ink-200 dark:border-ink-700 pb-1.5 handwriting text-lg text-ink-800 dark:text-ink-100 placeholder:text-ink-300 dark:placeholder:text-ink-600 placeholder:handwriting focus:outline-none focus:border-brass-400 dark:focus:border-brass-500 transition-colors duration-150"
      />

      <div className="flex justify-end mt-2">
        {isSaved ? (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="handwriting text-sm text-herb-500">
            Sealed
          </motion.span>
        ) : (
          <button
            onClick={handleSave}
            disabled={!goal.trim()}
            className="handwriting text-base text-ink-400 hover:text-ink-700 dark:text-ink-500 dark:hover:text-ink-300 disabled:text-ink-200 dark:disabled:text-ink-700 disabled:cursor-not-allowed transition-colors duration-150 focus-ring"
          >
            Seal
          </button>
        )}
      </div>
    </ArtifactCard>
  );
}
