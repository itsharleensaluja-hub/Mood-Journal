import { forwardRef } from 'react';

export const Input = forwardRef(function Input({
  label,
  error,
  helperText,
  icon: Icon,
  textarea = false,
  rows = 3,
  className = '',
  id,
  ...props
}, ref) {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  const baseClasses = `
    w-full bg-transparent border-b-2 transition-all duration-150
    text-ink-800 dark:text-ink-100
    placeholder:text-ink-400 dark:placeholder:text-ink-600
    focus:outline-none focus-ring
    ${error
      ? 'border-clay-400 dark:border-clay-500 focus:border-clay-500'
      : 'border-ink-200 dark:border-ink-700 focus:border-plum-400 dark:focus:border-plum-500'
    }
    ${Icon ? 'pl-8' : 'pl-0'}
    ${textarea ? 'py-2 resize-none' : 'py-2.5'}
    ${className}
  `;

  const Tag = textarea ? 'textarea' : 'input';

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-[13px] font-medium text-ink-700 dark:text-ink-300 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 text-ink-400 dark:text-ink-500">
            <Icon className="w-4 h-4" aria-hidden="true" />
          </div>
        )}
        <Tag
          ref={ref}
          id={inputId}
          rows={textarea ? rows : undefined}
          aria-invalid={!!error}
          aria-describedby={
            [error ? errorId : '', helperText ? helperId : ''].filter(Boolean).join(' ') || undefined
          }
          className={baseClasses}
          {...props}
        />
      </div>
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-sm text-clay-500 dark:text-clay-400">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={helperId} className="mt-1.5 text-sm text-ink-400 dark:text-ink-500">
          {helperText}
        </p>
      )}
    </div>
  );
});
