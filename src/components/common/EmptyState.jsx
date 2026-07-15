import { HandwrittenText } from '../archive/HandwrittenText';
import { ArtifactCard } from '../archive/ArtifactCard';

export function EmptyState({ icon = '◇', title, description, actionLabel, onAction }) {
  return (
    <ArtifactCard variant="specimen">
      <div className="py-12 text-center">
        <div className="w-14 h-14 rounded-xl bg-earth-200 dark:bg-ink-800 flex items-center justify-center mx-auto mb-4">
          <span className="text-xl text-ink-400">{icon}</span>
        </div>
        {title && (
          <HandwrittenText as="h2" size="lg" className="text-ink-800 dark:text-ink-200 mb-2">
            {title}
          </HandwrittenText>
        )}
        {description && (
          <HandwrittenText size="sm" color="ink-500" className="mb-5">
            {description}
          </HandwrittenText>
        )}
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="handwriting text-lg px-5 py-2 bg-brass-400/20 hover:bg-brass-400/30 text-ink-700 dark:text-ink-300 rounded-lg transition-colors duration-150 border border-brass-400/30 focus-ring"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </ArtifactCard>
  );
}
