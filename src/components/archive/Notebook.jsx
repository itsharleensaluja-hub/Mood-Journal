export function Notebook({ children, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative rounded-xl notebook-page shadow-depth overflow-hidden">
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-px w-px bg-ink-200/40 dark:bg-ink-700/40" aria-hidden="true" />
        <div className="relative p-5 sm:p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}

export function PageSpread({ left, right, className = '' }) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 ${className}`}>
      <div className="relative">
        {left}
      </div>
      <div className="relative lg:before:absolute lg:before:left-0 lg:before:top-0 lg:before:bottom-0 lg:before:w-px lg:before:bg-ink-200/40 dark:lg:before:bg-ink-700/40">
        {right}
      </div>
    </div>
  );
}

export function RuledPage({ children, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="border-b border-ink-100/40 dark:border-ink-800/40"
            style={{ height: '1.8rem' }}
          />
        ))}
      </div>
      <div className="relative">
        {children}
      </div>
    </div>
  );
}
