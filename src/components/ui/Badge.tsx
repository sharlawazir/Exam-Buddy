import { type ReactNode } from 'react';

type Variant = 'default' | 'accent' | 'success' | 'warning' | 'danger' | 'outline';

const variants: Record<Variant, string> = {
  default: 'bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-200',
  accent: 'bg-accent-50 dark:bg-accent-900/40 text-accent-700 dark:text-accent-300',
  success: 'bg-success-50 dark:bg-success-900/30 text-success-700 dark:text-success-400',
  warning: 'bg-warning-50 dark:bg-warning-900/30 text-warning-600 dark:text-warning-400',
  danger: 'bg-danger-50 dark:bg-danger-900/30 text-danger-600 dark:text-danger-400',
  outline: 'bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-200 border border-ink-200 dark:border-ink-700',
};

export function Badge({
  variant = 'default',
  children,
  className = '',
}: {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
