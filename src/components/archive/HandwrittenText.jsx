export function HandwrittenText({ children, size = 'base', color = 'ink-800', className = '', as = 'p', ...props }) {
  const Tag = as;
  const sizeClasses = {
    xs: 'text-sm',
    sm: 'text-base',
    base: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
  };
  const colorClasses = {
    'ink-800': 'text-ink-800 dark:text-ink-200',
    'ink-700': 'text-ink-700 dark:text-ink-300',
    'ink-600': 'text-ink-600 dark:text-ink-400',
    'plum-500': 'text-plum-500 dark:text-plum-400',
    'plum-600': 'text-plum-600 dark:text-plum-300',
    'herb-500': 'text-herb-500 dark:text-herb-400',
    'clay-500': 'text-clay-500 dark:text-clay-400',
  };
  return (
    <Tag
      className={`handwriting ${sizeClasses[size] || sizeClasses.base} ${colorClasses[color] || colorClasses['ink-800']} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
