import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineArrowRight } from 'react-icons/hi2';
import { GlassCard } from '../common/GlassCard';
import { useJournal } from '../../context/JournalContext';
import { getMoodById } from '../../data/moods';
import { staggerContainer, fadeUp } from '../../utils/animations';

function EntryItem({ entry, index }) {
  const mood = getMoodById(entry.moodId);
  const date = new Date(entry.createdAt);
  const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const preview = entry.note?.slice(0, 80) + (entry.note?.length > 80 ? '...' : '');

  return (
    <motion.div
      variants={fadeUp}
      className="flex gap-3 py-3"
    >
      <div className="flex flex-col items-center gap-1">
        <span className="text-sm">{mood?.emoji || '📝'}</span>
        <div className="w-px flex-1 bg-ink-200 dark:bg-ink-700" />
      </div>
      <div className="flex-1 min-w-0 pb-3">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-[11px] font-medium text-ink-400 dark:text-ink-500">{dateStr}</span>
          {mood && <span className="text-[11px] text-ink-400 dark:text-ink-500">· {mood.label}</span>}
        </div>
        <p className="text-sm text-ink-700 dark:text-ink-300 leading-relaxed">
          {preview || 'No note'}
        </p>
      </div>
    </motion.div>
  );
}

export function RecentEntries() {
  const [showAll, setShowAll] = useState(false);
  const { getRecentEntries } = useJournal();
  const entries = getRecentEntries(5);
  const hasMore = entries.length > 4;

  return (
    <GlassCard padding="md">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-medium text-ink-500 dark:text-ink-400 uppercase tracking-wider">
          Recent entries
        </h3>
        {hasMore && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-1 text-xs text-plum-500 hover:text-plum-600 dark:text-plum-400 dark:hover:text-plum-300 transition-colors"
          >
            {showAll ? 'Less' : 'All'}
            <HiOutlineArrowRight className={`w-3 h-3 transition-transform ${showAll ? 'rotate-90' : ''}`} />
          </button>
        )}
      </div>

      {entries.length === 0 ? (
        <p className="text-sm text-ink-400 dark:text-ink-500 py-6 text-center">
          No entries yet. Write something above!
        </p>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {(showAll ? entries : entries.slice(0, 4)).map((entry, i) => (
            <EntryItem key={entry.id} entry={entry} index={i} />
          ))}
        </motion.div>
      )}
    </GlassCard>
  );
}
