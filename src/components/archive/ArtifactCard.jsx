export function ArtifactCard({
  children,
  variant = 'specimen',
  className = '',
  onClick,
  hoverable = false,
  ...props
}) {
  const variantStyles = {
    specimen: 'bg-paper-100 dark:bg-ink-800/50 border border-earth-300 dark:border-ink-700 shadow-sm',
    tipped: 'bg-paper-50 dark:bg-ink-800/30 border border-earth-200 dark:border-ink-700 shadow-md -rotate-0.5 hover:rotate-0 transition-transform duration-300',
    pressed: 'bg-paper-50/80 dark:bg-ink-800/20 border border-earth-200/60 dark:border-ink-700/40',
    cabinet: 'bg-earth-50 dark:bg-ink-800/40 border border-earth-300 dark:border-ink-700 shadow-md',
  };

  const Tag = onClick || hoverable ? 'button' : 'div';

  return (
    <Tag
      onClick={onClick}
      className={`rounded-lg p-5 transition-all duration-200 ${variantStyles[variant] || variantStyles.specimen} ${hoverable || onClick ? 'hover:shadow-lg cursor-pointer hover:-translate-y-0.5' : ''} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
