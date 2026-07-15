import { HandwrittenText } from '../archive/HandwrittenText';

export function Pagination({ page, pages, total, onPageChange }) {
  if (pages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-4 pt-3 border-t border-ink-100/40 dark:border-ink-800/40">
      <HandwrittenText size="sm" color="ink-500">
        {total} page{total !== 1 ? 's' : ''}
      </HandwrittenText>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="handwriting text-base text-ink-400 hover:text-ink-700 dark:text-ink-500 dark:hover:text-ink-300 disabled:text-ink-200 dark:disabled:text-ink-700 disabled:cursor-not-allowed transition-colors px-2 py-1 focus-ring rounded"
        >
          ← Prev
        </button>
        <HandwrittenText size="sm" color="ink-400">
          {page} / {pages}
        </HandwrittenText>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= pages}
          className="handwriting text-base text-ink-400 hover:text-ink-700 dark:text-ink-500 dark:hover:text-ink-300 disabled:text-ink-200 dark:disabled:text-ink-700 disabled:cursor-not-allowed transition-colors px-2 py-1 focus-ring rounded"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
