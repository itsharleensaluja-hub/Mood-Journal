import { useAnimatedCounter } from '../../../hooks/useAnimatedCounter';

export function StatCard({ icon: Icon, label, value, suffix = '', color = 'plum', delay = 0 }) {
  const animatedValue = useAnimatedCounter(typeof value === 'number' ? value : 0);

  const dotColors = {
    plum: 'bg-plum-400',
    herb: 'bg-herb-400',
    clay: 'bg-clay-400',
    ink: 'bg-ink-300',
  };

  return (
    <div className="flex items-center gap-3">
      <span className={`w-2.5 h-2.5 rounded-full ${dotColors[color] || dotColors.plum}`} />
      <div>
        <div className="text-lg font-semibold text-ink-900 dark:text-ink-100">
          {typeof value === 'number' ? animatedValue : value}{suffix}
        </div>
        <div className="text-xs text-ink-400 dark:text-ink-500">{label}</div>
      </div>
    </div>
  );
}
