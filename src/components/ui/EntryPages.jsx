import { motion } from 'framer-motion';
import { useJournal } from '../../context/JournalContext';
import { getMoodById } from '../../data/moods';
import { HandwrittenText } from '../archive/HandwrittenText';
import { PressedFlower } from '../archive/PressedFlower';
import { Pagination } from '../common/Pagination';
import { SkeletonList } from '../common/Skeleton';
import { EmptyState } from '../common/EmptyState';
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
  const { entries, isLoaded, page, paginationMeta, changePage } = useJournal();

  if (!isLoaded) {
    return (
      <div>
        <HandwrittenText as="h3" size="sm" color="ink-500" className="uppercase tracking-wider typewriter text-[11px] mb-3">
          Recent pages
        </HandwrittenText>
        <SkeletonList count={3} variant="line" />
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <EmptyState
        icon="📄"
        title="No entries yet"
        description="Write something above to start your collection of pages."
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <HandwrittenText as="h3" size="sm" color="ink-500" className="uppercase tracking-wider typewriter text-[11px]">
          Recent pages
        </HandwrittenText>
      </div>

      <motion.div initial="initial" animate="animate">
        {entries.map((entry, i) => (
          <EntryPage key={entry._id} entry={entry} isLast={i === entries.length - 1} />
        ))}
      </motion.div>

      <Pagination
        page={page}
        pages={paginationMeta.pages}
        total={paginationMeta.total}
        onPageChange={changePage}
      />
    </div>
  );
}
