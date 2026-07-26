import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'soft';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-ink-950 disabled:opacity-60 disabled:pointer-events-none select-none';

const variants: Record<Variant, string> = {
  primary:
    'text-white bg-gradient-to-r from-accent-600 to-ink-600 hover:from-accent-500 hover:to-ink-500 shadow-glow hover:shadow-glow-lg active:scale-[0.98]',
  secondary: 'text-white bg-ink-900 hover:bg-ink-800 dark:bg-ink-800 dark:hover:bg-ink-700 active:scale-[0.98] shadow-soft',
  ghost: 'text-ink-700 dark:text-ink-200 hover:bg-ink-100 dark:hover:bg-ink-800 active:scale-[0.98]',
  outline:
    'text-ink-800 dark:text-ink-100 bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-700 hover:border-accent-400 hover:text-accent-700 dark:hover:text-accent-300 hover:bg-accent-50 dark:hover:bg-ink-800 active:scale-[0.98]',
  soft: 'text-accent-700 dark:text-accent-300 bg-accent-50 dark:bg-accent-900/40 hover:bg-accent-100 dark:hover:bg-accent-900/60 active:scale-[0.98]',
};

const sizes: Record<Size, string> = {
  sm: 'text-sm px-3.5 py-2',
  md: 'text-sm px-5 py-2.5',
  lg: 'text-base px-7 py-3.5',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}
