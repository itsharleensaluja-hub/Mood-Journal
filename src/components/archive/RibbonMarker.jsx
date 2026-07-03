export function RibbonMarker({ label, value, color = 'plum', className = '' }) {
  const colorClasses = {
    plum: 'bg-plum-400 dark:bg-plum-500',
    herb: 'bg-herb-400 dark:bg-herb-500',
    clay: 'bg-clay-400 dark:bg-clay-500',
    amber: 'bg-amber-400 dark:bg-amber-500',
    ink: 'bg-ink-300 dark:bg-ink-600',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`w-1 h-8 rounded-full ${colorClasses[color] || colorClasses.plum}`} />
      <div>
        <div className="typewriter text-[11px] uppercase tracking-wider text-ink-400 dark:text-ink-500">{label}</div>
        <div className="handwriting text-lg text-ink-800 dark:text-ink-200">{value}</div>
      </div>
    </div>
  );
}
