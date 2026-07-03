export function PaperDivider({ className = '' }) {
  return (
    <div className={`relative h-6 overflow-hidden ${className}`} aria-hidden="true">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-earth-300 dark:bg-ink-700" />
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 border border-earth-300 dark:border-ink-700 bg-paper-100 dark:bg-ink-800" />
    </div>
  );
}
