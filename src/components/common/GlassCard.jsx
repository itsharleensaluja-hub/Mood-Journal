import { forwardRef } from 'react';

const variantStyles = {
  flat: 'card',
  elevated: 'card-elevated',
  accent: 'card-accent',
};

const colorAccents = {
  plum: 'border-l-plum-400 dark:border-l-plum-500',
  herb: 'border-l-herb-400 dark:border-l-herb-500',
  clay: 'border-l-clay-400 dark:border-l-clay-500',
  none: '',
};

const paddingMap = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
};

export const GlassCard = forwardRef(function GlassCard({
  children,
  variant = 'elevated',
  padding = 'md',
  color = 'none',
  hoverable = false,
  className = '',
  onClick,
  role,
  ariaLabel,
  tabIndex,
  ...props
}, ref) {
  const isInteractive = hoverable || onClick;
  const Tag = isInteractive ? 'button' : 'div';

  return (
    <Tag
      ref={ref}
      onClick={onClick}
      role={role ?? (onClick ? 'button' : undefined)}
      aria-label={ariaLabel}
      tabIndex={tabIndex ?? (onClick ? 0 : undefined)}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(e); } : undefined}
      className={`
        rounded-xl transition-all duration-200
        ${variantStyles[variant] || variantStyles.elevated}
        ${color !== 'none' ? colorAccents[color] || '' : ''}
        ${color !== 'none' ? '' : ''}
        ${paddingMap[padding] || paddingMap.md}
        ${isInteractive ? 'hover:shadow-lg cursor-pointer text-left' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </Tag>
  );
});
