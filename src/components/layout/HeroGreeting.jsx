import { useJournal } from '../../context/JournalContext';
import { HandwrittenText } from '../archive/HandwrittenText';
import { AppLogo } from '../ui/AppLogo';

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
    <div className="mb-6 text-center lg:text-left">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-earth-200/50 dark:bg-ink-800/40 border border-earth-300/50 dark:border-ink-700/50 mb-3">
        <AppLogo size="xs" variant="symbol" className="text-brass-400" />
        <HandwrittenText size="sm" color="ink-500" className="tracking-wide">
          MindPulse Archive
        </HandwrittenText>
      </div>
      <HandwrittenText as="h1" size="xl" className="text-ink-900 dark:text-ink-100 leading-tight">
        {greeting}!
      </HandwrittenText>
      <HandwrittenText size="sm" color="ink-500" className="mt-1">
        {streakLabel}
      </HandwrittenText>
    </div>
  );
}
