const colorVariants = {
  plum: 'bg-plum-100 text-plum-700 dark:bg-plum-900/30 dark:text-plum-300',
  herb: 'bg-herb-100 text-herb-700 dark:bg-herb-900/30 dark:text-herb-300',
  clay: 'bg-clay-100 text-clay-700 dark:bg-clay-900/30 dark:text-clay-300',
  ink: 'bg-ink-100 text-ink-600 dark:bg-ink-800/30 dark:text-ink-400',
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

export function Badge({
  children,
  color = 'plum',
  size = 'sm',
  dot = false,
  className = '',
}) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-medium rounded-md
        ${colorVariants[color] || colorVariants.plum}
        ${sizes[size] || sizes.sm}
        ${className}
      `}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />}
      {children}
    </span>
  );
}
