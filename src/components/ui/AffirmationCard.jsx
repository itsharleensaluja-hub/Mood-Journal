import { GlassCard } from '../common/GlassCard';
import { useJournal } from '../../context/JournalContext';

export function AffirmationCard() {
  const { affirmation } = useJournal();

  return (
    <GlassCard padding="md" variant="accent" color="plum">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm">💫</span>
        <span className="text-xs font-medium text-plum-500 dark:text-plum-400 uppercase tracking-wider">Daily Affirmation</span>
      </div>
      <p className="text-sm font-serif italic text-ink-700 dark:text-ink-300 leading-relaxed">
        &ldquo;{affirmation}&rdquo;
      </p>
    </GlassCard>
  );
}
