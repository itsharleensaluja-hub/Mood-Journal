import { forwardRef } from 'react';
import { Spinner } from './Spinner';

const variants = {
  primary:
    'bg-plum-500 text-white hover:bg-plum-600 active:bg-plum-700 dark:bg-plum-600 dark:hover:bg-plum-500',
  secondary:
    'border border-ink-300 text-ink-700 hover:bg-earth-100 active:bg-earth-200 dark:border-ink-600 dark:text-ink-300 dark:hover:bg-ink-800 dark:active:bg-ink-700',
  ghost:
    'text-ink-600 hover:text-ink-900 hover:bg-earth-100 dark:text-ink-400 dark:hover:text-ink-200 dark:hover:bg-ink-800',
  danger:
    'bg-clay-500 text-white hover:bg-clay-600 active:bg-clay-700 dark:bg-clay-600 dark:hover:bg-clay-500',
};

const sizes = {
  sm: 'px-4 py-2 text-sm min-h-[36px]',
  md: 'px-5 py-2.5 text-sm min-h-[42px]',
  lg: 'px-7 py-3.5 text-base min-h-[50px]',
};

export const Button = forwardRef(function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  type = 'button',
  ariaLabel,
  onClick,
  ...props
}, ref) {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-disabled={isDisabled}
      aria-busy={loading}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center gap-2 font-medium
        rounded-lg transition-all duration-150 focus-ring
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'active:scale-[0.97] cursor-pointer'}
        ${className}
      `}
      {...props}
    >
      {loading && <Spinner size="sm" className="text-current" />}
      {!loading && Icon && iconPosition === 'left' && <Icon className="w-4 h-4" aria-hidden="true" />}
      <span>{children}</span>
      {!loading && Icon && iconPosition === 'right' && <Icon className="w-4 h-4" aria-hidden="true" />}
    </button>
  );
});
