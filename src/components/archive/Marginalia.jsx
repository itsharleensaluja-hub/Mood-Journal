export function Marginalia({ children, color = 'plum', className = '' }) {
  const colorClasses = {
    plum: 'text-plum-500 dark:text-plum-400 border-plum-300 dark:border-plum-700',
    herb: 'text-herb-500 dark:text-herb-400 border-herb-300 dark:border-herb-700',
    clay: 'text-clay-500 dark:text-clay-400 border-clay-300 dark:border-clay-700',
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`ml-1 pl-3 border-l-2 ${colorClasses[color] || colorClasses.plum}`}>
        <p className={`handwriting text-sm ${colorClasses[color] || colorClasses.plum} leading-relaxed`}>
          {children}
        </p>
      </div>
    </div>
  );
}
