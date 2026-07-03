import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../../common/GlassCard';

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
    <GlassCard padding="md">
      <h4 className="text-xs font-medium text-ink-500 dark:text-ink-400 uppercase tracking-wider mb-3">
        Tomorrow's Goal
      </h4>

      <input
        type="text"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSave()}
        placeholder={suggestedGoal || 'Set an intention for tomorrow...'}
        aria-label="Set tomorrow's goal"
        className="w-full bg-transparent border-b-2 border-ink-200 dark:border-ink-700 pb-1.5 text-sm text-ink-800 dark:text-ink-100 placeholder:text-ink-400 dark:placeholder:text-ink-600 focus:outline-none focus:border-plum-400 dark:focus:border-plum-500 transition-colors duration-150"
      />

      <div className="flex justify-end mt-2">
        {isSaved ? (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-herb-500 font-medium">
            Goal saved
          </motion.span>
        ) : (
          <button
            onClick={handleSave}
            disabled={!goal.trim()}
            className="text-xs font-medium text-plum-500 hover:text-plum-600 disabled:text-ink-300 dark:disabled:text-ink-600 disabled:cursor-not-allowed transition-colors duration-150"
          >
            Save
          </button>
        )}
      </div>
    </GlassCard>
  );
}
