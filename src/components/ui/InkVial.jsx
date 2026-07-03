import { useJournal } from '../../context/JournalContext';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';
import { HandwrittenText } from '../archive/HandwrittenText';

const levels = [
  { min: 0, label: 'Draft', color: 'bg-clay-400' },
  { min: 40, label: 'Scribble', color: 'bg-clay-300' },
  { min: 60, label: 'Journal', color: 'bg-herb-300' },
  { min: 75, label: 'Manuscript', color: 'bg-herb-400' },
];

export function InkVial() {
  const { stats } = useJournal();
  const score = stats?.balance?.score || 0;
  const animatedScore = useAnimatedCounter(score);
  const level = [...levels].reverse().find(l => score >= l.min) || levels[0];

  return (
    <div className="flex items-center gap-3">
      <div className="relative w-8 h-16 flex-shrink-0">
        <svg viewBox="0 0 32 64" className="w-full h-full" fill="none">
          <path d="M12 8 L14 4 L18 4 L20 8 L20 56 Q20 60 16 60 Q12 60 12 56 Z" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <path d="M14 6 L14 8 L18 8 L18 6 Z" fill="#C9A84C" opacity="0.5" />
          <rect x="14" y={56 - (score / 100) * 44} width="4" height={(score / 100) * 44} rx="1" fill="#6B4E9B" opacity={0.4} />
          <rect x="14" y={56 - (score / 100) * 44} width="4" height={(score / 100) * 44} rx="1" fill="url(#inkGradient)" opacity={0.6} />
          <defs>
            <linearGradient id="inkGradient" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#6B4E9B" />
              <stop offset="100%" stopColor="#B69FCC" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div>
        <HandwrittenText as="div" size="xl" className="text-plum-500 dark:text-plum-400">
          {animatedScore}
        </HandwrittenText>
        <HandwrittenText size="xs" color="ink-500">{level.label}</HandwrittenText>
      </div>
    </div>
  );
}
