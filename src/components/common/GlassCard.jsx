import { forwardRef } from 'react';

const variantStyles = {
  default: 'card',
  elevated: 'card-elevated',
  accent: 'card-accent',
  highlight: 'card-highlight',
};

const colorAccents = {
  lavender: 'border-t-plum-400 dark:border-t-plum-500',
  mint: 'border-t-herb-400 dark:border-t-herb-500',
  sky: 'border-t-plum-300 dark:border-t-plum-400',
  peach: 'border-t-clay-400 dark:border-t-clay-500',
  none: '',
};

const paddingMap = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const GlassCard = forwardRef(function GlassCard({
  children,
  variant = 'default',
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
        ${variantStyles[variant] || variantStyles.default}
        ${color !== 'none' ? colorAccents[color] || '' : ''}
        ${color !== 'none' ? 'border-t-2' : ''}
        ${paddingMap[padding] || paddingMap.md}
        ${isInteractive ? 'hover:shadow-lg hover:-translate-y-0.5 cursor-pointer text-left' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </Tag>
  );
});
