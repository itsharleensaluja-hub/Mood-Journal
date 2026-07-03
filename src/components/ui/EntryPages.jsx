import { useState } from 'react';
import { motion } from 'framer-motion';
import { useJournal } from '../../context/JournalContext';
import { getMoodById } from '../../data/moods';
import { HandwrittenText } from '../archive/HandwrittenText';
import { PressedFlower } from '../archive/PressedFlower';
import { fadeUp } from '../../utils/animations';

function EntryPage({ entry, isLast }) {
  const mood = getMoodById(entry.moodId);
  const date = new Date(entry.createdAt);
  const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const preview = entry.note?.slice(0, 100) + (entry.note?.length > 100 ? '...' : '');

  return (
    <motion.div
      variants={fadeUp}
      className={`flex gap-3 py-3 ${!isLast ? 'border-b border-ink-100/40 dark:border-ink-800/40' : ''}`}
    >
      <div className="flex flex-col items-center gap-1 pt-0.5">
        <PressedFlower moodId={entry.moodId} size="sm" />
        {!isLast && <div className="w-px flex-1 bg-ink-200/30 dark:bg-ink-700/30" />}
      </div>
      <div className="flex-1 min-w-0 pb-2">
        <div className="flex items-center gap-2 mb-0.5">
          <HandwrittenText size="xs" color="ink-400">{dateStr}</HandwrittenText>
          {mood && (
            <span className="text-[10px] typewriter text-ink-400 dark:text-ink-500 uppercase tracking-wider">
              {mood.label}
            </span>
          )}
        </div>
        <HandwrittenText size="sm" className="text-ink-700 dark:text-ink-300">
          {preview || 'No note'}
        </HandwrittenText>
      </div>
    </motion.div>
  );
}

export function EntryPages() {
  const [showAll, setShowAll] = useState(false);
  const { getRecentEntries } = useJournal();
  const entries = getRecentEntries(5);
  const hasMore = entries.length > 4;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <HandwrittenText as="h3" size="sm" color="ink-500" className="uppercase tracking-wider typewriter text-[11px]">
          Recent pages
        </HandwrittenText>
        {hasMore && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="handwriting text-sm text-ink-400 hover:text-ink-700 dark:text-ink-500 dark:hover:text-ink-300 transition-colors focus-ring px-1"
          >
            {showAll ? 'Close' : 'All pages'}
          </button>
        )}
      </div>

      {entries.length === 0 ? (
        <HandwrittenText size="sm" color="ink-500" className="py-6 text-center block">
          No entries yet. Write something above.
        </HandwrittenText>
      ) : (
        <motion.div initial="initial" animate="animate">
          {(showAll ? entries : entries.slice(0, 4)).map((entry, i) => (
            <EntryPage key={entry.id} entry={entry} index={i} isLast={i === (showAll ? entries.length : Math.min(4, entries.length)) - 1} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
