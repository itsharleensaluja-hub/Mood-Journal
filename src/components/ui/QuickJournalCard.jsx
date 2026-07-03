import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../common/GlassCard';
import { useJournal } from '../../context/JournalContext';

export function QuickJournalCard() {
  const [note, setNote] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const { currentMood, addEntry } = useJournal();

  const handleSave = () => {
    if (!note.trim()) return;
    addEntry({ moodId: currentMood, note: note.trim() });
    setNote('');
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <GlassCard padding="md">
      <h2 className="text-sm font-medium text-ink-700 dark:text-ink-300 mb-3">
        What's on your mind?
      </h2>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        onKeyDown={(e) => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') handleSave(); }}
        placeholder="Write a few sentences about your day..."
        rows={3}
        aria-label="Journal entry"
        className="w-full bg-transparent border-b-2 border-ink-200 dark:border-ink-700 pb-2 text-sm text-ink-800 dark:text-ink-100 placeholder:text-ink-400 dark:placeholder:text-ink-600 focus:outline-none focus:border-plum-400 dark:focus:border-plum-500 transition-colors duration-150 resize-none"
      />

      <div className="flex items-center justify-between mt-3">
        <span className="text-xs text-ink-400 dark:text-ink-500">
          {currentMood ? 'Mood selected' : 'No mood selected'} · {currentMood ? '' : 'select one above'}
        </span>

        <AnimatePresence>
          {isSaved ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs text-herb-500 font-medium"
            >
              Saved
            </motion.span>
          ) : (
            <button
              onClick={handleSave}
              disabled={!note.trim()}
              className="text-xs font-medium text-plum-500 hover:text-plum-600 disabled:text-ink-300 dark:disabled:text-ink-600 disabled:cursor-not-allowed transition-colors duration-150"
            >
              Save entry
            </button>
          )}
        </AnimatePresence>
      </div>
    </GlassCard>
  );
}
