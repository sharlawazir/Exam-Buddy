import { type ReactNode } from 'react';

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'center' | 'left';
  className?: string;
}) {
  return (
    <div
      className={`${align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl text-left'} ${className}`}
    >
      {eyebrow && (
        <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-accent-600 dark:text-accent-400 mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.1] text-ink-900 dark:text-ink-50 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-ink-500 dark:text-ink-400 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
