import { AlertTriangle, X } from 'lucide-react';

export function ErrorBanner({
  message,
  onRetry,
  onDismiss,
  className = '',
}: {
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={`flex items-start gap-3 rounded-xl border border-danger-200 bg-danger-50 px-4 py-3.5 text-sm text-danger-600 ${className}`}
    >
      <AlertTriangle className="h-5 w-5 shrink-0 text-danger-500" />
      <p className="flex-1 leading-relaxed">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="shrink-0 rounded-lg bg-danger-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-danger-600 transition-colors"
        >
          Try again
        </button>
      )}
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="shrink-0 text-danger-400 hover:text-danger-600 transition-colors"
          aria-label="Dismiss error"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
