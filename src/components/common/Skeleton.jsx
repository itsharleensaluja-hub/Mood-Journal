export function Skeleton({ variant = 'text', className = '' }) {
  const base = 'animate-pulse bg-earth-200 dark:bg-ink-700 rounded';

  const variants = {
    text: `${base} h-4 w-full`,
    heading: `${base} h-6 w-3/4`,
    card: `${base} h-32 w-full`,
    chart: `${base} h-64 w-full`,
    avatar: `${base} h-10 w-10 rounded-full`,
    badge: `${base} h-6 w-20 rounded-full`,
    line: `${base} h-3 w-full`,
  };

  return <div className={`${variants[variant] || variants.text} ${className}`} />;
}

export function SkeletonList({ count = 4, variant = 'text', className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} variant={variant} />
      ))}
    </div>
  );
}
