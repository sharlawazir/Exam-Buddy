export function LoadingDots({ label = 'Thinking', className = '' }: { label?: string; className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span className="flex items-center gap-1">
        <span className="h-2 w-2 animate-bounce rounded-full bg-accent-500 [animation-delay:-0.3s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-accent-500 [animation-delay:-0.15s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-accent-500" />
      </span>
      <span className="text-sm text-ink-400">{label}…</span>
    </div>
  );
}

/** Full-card loading skeleton used while generating results. */
export function LoadingPanel({ label = 'Generating', className = '' }: { label?: string; className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 py-16 ${className}`}>
      <div className="relative">
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent-400/40" />
        <span className="relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-accent-500 to-ink-600 text-white shadow-glow">
          <svg className="h-6 w-6 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path className="opacity-90" d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </span>
      </div>
      <LoadingDots label={label} />
    </div>
  );
}
