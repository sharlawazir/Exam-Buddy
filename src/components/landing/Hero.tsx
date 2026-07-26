import { Sparkles, ArrowRight, PlayCircle, Star } from 'lucide-react';
import { useRouter } from '@/router/Router';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const avatars = [
  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
  'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
  'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
  'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
];

export function Hero() {
  const { navigate } = useRouter();

  return (
    <section className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[520px] w-[820px] rounded-full bg-gradient-to-br from-accent-200/40 via-ink-200/30 to-transparent blur-3xl" />
        <div className="absolute top-40 -right-20 h-72 w-72 rounded-full bg-accent-100/50 blur-3xl" />
      </div>

      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center animate-fade-up">
          <Badge variant="accent" className="mb-5 px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            Now with adaptive study paths
          </Badge>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-[4.25rem] font-extrabold leading-[1.05] tracking-tight text-ink-900 dark:text-ink-50">
            Ace every exam with your{' '}
            <span className="gradient-text">AI study buddy</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-ink-500 dark:text-ink-300 leading-relaxed">
            Turn dense lecture notes into quizzes, summaries, and a personalized study plan — all
            powered by AI tuned for university students. Study smarter, not longer.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" onClick={() => navigate('assistant')} rightIcon={<ArrowRight className="h-5 w-5" />}>
              Start studying free
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('quiz')}
              leftIcon={<PlayCircle className="h-5 w-5" />}
            >
              See it in action
            </Button>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5 text-sm text-ink-500 dark:text-ink-400">
            <div className="flex items-center -space-x-2">
              {avatars.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="h-9 w-9 rounded-full border-2 border-white dark:border-ink-950 object-cover"
                  loading="lazy"
                />
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center text-warning-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="font-semibold text-ink-700 dark:text-ink-200">4.9</span>
              <span>· loved by 12,000+ students</span>
            </div>
          </div>
        </div>

        {/* Hero product preview */}
        <div className="mt-16 lg:mt-20 mx-auto max-w-5xl animate-fade-up [animation-delay:200ms]">
          <HeroPreview />
        </div>
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <div className="relative">
      <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-accent-200/40 via-ink-200/30 to-transparent blur-2xl" />
      <div className="rounded-2xl border border-ink-100 dark:border-ink-800 bg-white/90 dark:bg-ink-900/90 backdrop-blur-xl shadow-glow-lg overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-ink-100 dark:border-ink-800 bg-ink-50/60 dark:bg-ink-800/40">
          <span className="h-3 w-3 rounded-full bg-danger-300" />
          <span className="h-3 w-3 rounded-full bg-warning-400" />
          <span className="h-3 w-3 rounded-full bg-success-500" />
          <span className="ml-3 text-xs font-medium text-ink-400 dark:text-ink-500">Exam Buddy AI — Assistant</span>
        </div>

        <div className="grid md:grid-cols-3">
          {/* Sidebar */}
          <div className="hidden md:flex flex-col gap-1 p-4 border-r border-ink-100 dark:border-ink-800 bg-ink-50/40 dark:bg-ink-800/30">
            <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-ink-400 dark:text-ink-500">
              Recent chats
            </div>
            {['Organic chem — SN2', 'Macroeconomics review', 'Linear algebra finals', 'Constitutional law'].map(
              (t, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                    i === 0 ? 'bg-accent-50 dark:bg-accent-900/40 text-accent-700 dark:text-accent-300 font-medium' : 'text-ink-600 dark:text-ink-300'
                  }`}
                >
                  <Sparkles className="h-4 w-4 shrink-0" />
                  <span className="truncate">{t}</span>
                </div>
              ),
            )}
          </div>

          {/* Chat */}
          <div className="md:col-span-2 p-5 space-y-4">
            <div className="flex justify-end">
              <div className="max-w-[80%] rounded-2xl rounded-br-md bg-ink-900 dark:bg-ink-800 text-white px-4 py-2.5 text-sm">
                Explain the difference between SN1 and SN2 reactions with an example.
              </div>
            </div>
            <div className="flex justify-start gap-2.5">
              <div className="h-8 w-8 shrink-0 rounded-lg bg-gradient-to-br from-accent-500 to-ink-600 grid place-items-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="max-w-[85%] space-y-2">
                <div className="rounded-2xl rounded-bl-md bg-ink-50 dark:bg-ink-800 px-4 py-3 text-sm text-ink-700 dark:text-ink-200 leading-relaxed">
                  <span className="font-semibold text-ink-900 dark:text-ink-50">SN1</span> is a two-step mechanism
                  with a carbocation intermediate — rate depends only on the substrate.{' '}
                  <span className="font-semibold text-ink-900 dark:text-ink-50">SN2</span> is a one-step,
                  concerted backside attack — rate depends on both substrate and nucleophile.
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-lg bg-accent-50 dark:bg-accent-900/40 px-2.5 py-1 text-xs font-medium text-accent-700 dark:text-accent-300">
                    Generate quiz
                  </span>
                  <span className="rounded-lg bg-ink-100 dark:bg-ink-800 px-2.5 py-1 text-xs font-medium text-ink-600 dark:text-ink-300">
                    Summarize
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-ink-100 dark:border-ink-800 bg-white dark:bg-ink-900 px-3 py-2.5">
              <input
                disabled
                placeholder="Ask anything about your course…"
                className="flex-1 bg-transparent text-sm text-ink-400 dark:text-ink-500 placeholder:text-ink-400 focus:outline-none"
              />
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent-600 to-ink-600 text-white">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
