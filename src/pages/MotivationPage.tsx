import { useState, useCallback } from 'react';
import {
  Flame,
  Sparkles,
  Quote,
  TrendingUp,
  Heart,
  Trophy,
  Brain,
  Zap,
  Compass,
  Shield,
  Trash2,
  type LucideIcon,
} from 'lucide-react';
import { ToolPage, type ToolMeta } from '@/components/tools/ToolPage';
import { useToast } from '@/components/ui/Toast';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { LoadingDots } from '@/components/ui/Loading';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { CopyButton } from '@/components/ui/CopyButton';
import { getMotivation, type MotivationCard } from '@/services/ai';

const meta: ToolMeta = {
  icon: Flame,
  label: 'Motivation',
  title: 'Motivation Generator',
  subtitle:
    'Hit the button for a fresh, personalised motivational message whenever the late-night studying gets tough. Collect your favorites.',
  accent: 'from-warning-500 to-accent-600',
  badge: 'AI-powered',
};

const toneStyles: Record<MotivationCard['tone'], { ring: string; chip: string; icon: LucideIcon; label: string }> = {
  calm: { ring: 'from-accent-400 to-ink-500', chip: 'bg-accent-50 dark:bg-accent-900/40 text-accent-700 dark:text-accent-300', icon: Heart, label: 'Calm' },
  energetic: { ring: 'from-warning-400 to-accent-500', chip: 'bg-warning-50 dark:bg-warning-900/40 text-warning-600 dark:text-warning-400', icon: Zap, label: 'Energetic' },
  reflective: { ring: 'from-ink-500 to-accent-600', chip: 'bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300', icon: Compass, label: 'Reflective' },
  bold: { ring: 'from-danger-500 to-accent-700', chip: 'bg-danger-50 dark:bg-danger-900/40 text-danger-600 dark:text-danger-400', icon: Shield, label: 'Bold' },
};

const streak = 7;

const quickStats = [
  { icon: TrendingUp, label: 'Sessions this week', value: '12' },
  { icon: Trophy, label: 'Best streak', value: '9 days' },
  { icon: Brain, label: 'Topics covered', value: '6' },
];

export function MotivationPage() {
  const toast = useToast();
  const [current, setCurrent] = useState<MotivationCard | null>(null);
  const [history, setHistory] = useState<MotivationCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const motivate = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const card = await getMotivation('A university student preparing for exams.');
      setCurrent(card);
      setHistory((prev) => [card, ...prev].slice(0, 8));
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Could not load a message. Try again.';
      setError(msg);
      toast(msg, 'error');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const clearHistory = () => {
    setHistory(current ? [current] : []);
    toast('History cleared', 'info');
  };

  return (
    <ToolPage meta={meta}>
      {/* Streak hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink-900 via-ink-900 to-accent-800 p-7 sm:p-10 text-white shadow-glow-lg">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-warning-500/30 blur-3xl" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Badge className="bg-white/10 text-white border border-white/20">
              <Flame className="h-3.5 w-3.5 text-warning-400" />
              Current streak
            </Badge>
            <div className="mt-4 flex items-end gap-2">
              <span className="font-display text-6xl font-extrabold leading-none">{streak}</span>
              <span className="mb-1 text-lg font-medium text-ink-200">days in a row</span>
            </div>
            <p className="mt-3 max-w-md text-sm text-ink-200">
              You have studied every day this week. Keep it going — your future self will thank you.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className={`grid h-11 w-11 place-items-center rounded-xl ${
                  i < streak ? 'bg-gradient-to-br from-warning-400 to-accent-500 text-white shadow-glow' : 'bg-white/10 text-ink-300'
                }`}
              >
                <Flame className="h-5 w-5" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {quickStats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="flex items-center gap-3.5 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-50 dark:bg-accent-900/40 text-accent-600 dark:text-accent-300">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <div className="font-display text-xl font-bold text-ink-900 dark:text-ink-50">{s.value}</div>
                <div className="text-xs text-ink-500 dark:text-ink-400">{s.label}</div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Motivate me */}
      <Card className="mt-6 p-7 sm:p-9">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink-900 dark:text-ink-50">Need a boost right now?</h2>
            <p className="mt-1.5 text-sm text-ink-500 dark:text-ink-400">
              Tap the button for a motivational card. Each message is freshly generated and personalised to studying and exams.
            </p>
          </div>
          <Button
            size="lg"
            loading={loading}
            onClick={motivate}
            leftIcon={<Sparkles className="h-5 w-5" />}
            className="shrink-0"
          >
            Motivate me
          </Button>
        </div>

        {error && <ErrorBanner className="mt-4" message={error} onRetry={motivate} onDismiss={() => setError(null)} />}

        {/* Current card */}
        {loading && !current && (
          <div className="mt-6 flex h-44 items-center justify-center rounded-2xl border border-dashed border-ink-200 dark:border-ink-700">
            <LoadingDots label="Finding the right words" />
          </div>
        )}

        {current && !loading && (
          <div key={current.id} className="mt-6 animate-fade-up">
            <MotivationCardView card={current} featured />
          </div>
        )}

        {!current && !loading && !error && (
          <div className="mt-6 flex h-44 flex-col items-center justify-center rounded-2xl border border-dashed border-ink-200 dark:border-ink-700 text-center">
            <Flame className="h-7 w-7 text-ink-300 dark:text-ink-600" />
            <p className="mt-2 text-sm text-ink-400 dark:text-ink-500">Your first motivational card is one tap away.</p>
          </div>
        )}
      </Card>

      {/* History */}
      {history.length > 1 && (
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-ink-900 dark:text-ink-50">Recent boosts</h3>
            <button
              onClick={clearHistory}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-400 dark:text-ink-500 hover:text-ink-700 dark:hover:text-ink-200 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {history.slice(1).map((card) => (
              <MotivationCardView key={card.id} card={card} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        <Badge variant="accent">
          <Sparkles className="h-3 w-3" />
          Generated by AI
        </Badge>
      </div>
    </ToolPage>
  );
}

function MotivationCardView({ card, featured = false }: { card: MotivationCard; featured?: boolean }) {
  const style = toneStyles[card.tone];
  const Icon = style.icon;

  return (
    <Card hover className={`relative overflow-hidden p-6 ${featured ? 'sm:p-8' : ''}`}>
      <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${style.ring} opacity-10 blur-2xl`} />
      <div className="relative flex items-start gap-3">
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${style.chip}`}>
          <Icon className="h-5 w-5" />
        </span>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-lg font-bold text-ink-900 dark:text-ink-50">{card.title}</h3>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${style.chip}`}>
              {style.label}
            </span>
          </div>
          <div className="mt-2 flex items-start gap-2">
            <Quote className="h-5 w-5 shrink-0 text-accent-200 dark:text-accent-700" />
            <p className="text-sm leading-relaxed text-ink-700 dark:text-ink-200">{card.message}</p>
          </div>
          {featured && (
            <div className="mt-4 flex items-center gap-2">
              <CopyButton text={card.message} label="Copy message" />
              <span className="text-xs text-ink-400 dark:text-ink-500">Save it for later</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
