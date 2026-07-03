import { useJournal } from '../../context/JournalContext';

function getTimeBasedGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export function HeroGreeting() {
  const { stats } = useJournal();
  const streak = stats?.streak?.current || 0;
  const greeting = getTimeBasedGreeting();

  const streakLabel = streak === 0
    ? 'Ready to start your journey?'
    : streak === 1
      ? 'You started your streak today!'
      : `${streak}-day streak going strong`;

  return (
    <div className="mb-8">
      <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-ink-900 dark:text-ink-100 leading-tight">
        {greeting}! <span className="text-plum-500">✦</span>
      </h1>
      <p className="mt-1.5 text-sm text-ink-400 dark:text-ink-500">
        {streakLabel}
      </p>
    </div>
  );
}
