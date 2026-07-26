import { type ReactNode } from 'react';

export function Card({
  children,
  className = '',
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`card-surface ${hover ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-glow' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
