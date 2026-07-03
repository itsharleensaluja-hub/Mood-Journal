import { GlassCard } from '../common/GlassCard';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';
import { useJournal } from '../../context/JournalContext';

const levels = [
  { min: 0, label: 'Struggling', color: 'bg-clay-400' },
  { min: 40, label: 'Managing', color: 'bg-clay-300' },
  { min: 60, label: 'Balanced', color: 'bg-herb-300' },
  { min: 75, label: 'Thriving', color: 'bg-herb-400' },
];

export function EmotionalBalance() {
  const { stats } = useJournal();
  const score = stats?.balance?.score || 0;
  const animatedScore = useAnimatedCounter(score);

  const level = [...levels].reverse().find(l => score >= l.min) || levels[0];

  return (
    <GlassCard padding="md" variant="accent" color="plum">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-ink-400 dark:text-ink-500">Balance</span>
        <span className="text-2xl font-bold text-ink-900 dark:text-ink-100">{animatedScore}</span>
      </div>
      <div className="w-full h-2 bg-earth-200 dark:bg-ink-700 rounded-full overflow-hidden mb-2">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${level.color}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-xs font-medium text-ink-500 dark:text-ink-400">{level.label}</span>
    </GlassCard>
  );
}
