import { type ReactNode } from 'react';
import { type LucideIcon, ArrowLeft, Sparkles } from 'lucide-react';
import { useRouter } from '@/router/Router';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/Reveal';

export interface ToolMeta {
  icon: LucideIcon;
  label: string;
  title: string;
  subtitle: string;
  accent: string; // tailwind gradient stops
  badge?: string;
}

export function ToolHeader({ meta }: { meta: ToolMeta }) {
  const { navigate } = useRouter();
  const Icon = meta.icon;

  return (
    <div className="relative overflow-hidden pt-28 pb-10 lg:pt-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
        <div className={`absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-[640px] rounded-full bg-gradient-to-br ${meta.accent} opacity-20 blur-3xl`} />
      </div>
      <div className="container-page">
        <button
          onClick={() => navigate('home')}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 dark:text-ink-400 hover:text-ink-900 dark:hover:text-ink-100 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </button>

        <Reveal>
          <div className="mt-6 flex items-center gap-4">
            <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.accent} text-white shadow-glow`}>
              <Icon className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink-900 dark:text-ink-50 tracking-tight">
                  {meta.title}
                </h1>
                {meta.badge && (
                  <Badge variant="accent">
                    <Sparkles className="h-3 w-3" />
                    {meta.badge}
                  </Badge>
                )}
              </div>
              <p className="mt-1 text-base text-ink-500 dark:text-ink-400 max-w-2xl">{meta.subtitle}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export function ToolPage({
  meta,
  children,
}: {
  meta: ToolMeta;
  children: ReactNode;
}) {
  return (
    <div className="pb-24">
      <ToolHeader meta={meta} />
      <div className="container-page">{children}</div>
    </div>
  );
}
