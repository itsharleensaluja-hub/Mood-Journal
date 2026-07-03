export function InkDivider({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-ink-200 dark:via-ink-700 to-transparent" />
      <span className="handwriting text-sm text-ink-300 dark:text-ink-600">~</span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-ink-200 dark:via-ink-700 to-transparent" />
    </div>
  );
}
