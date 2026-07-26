import { ArrowRight, Check } from 'lucide-react';
import { useRouter } from '@/router/Router';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/Reveal';

const perks = [
  'Free forever tier — no card required',
  'Unlimited summaries on the Plus plan',
  'Works with PDFs, notes, and plain text',
  'Cancel anytime',
];

export function CTA() {
  const { navigate } = useRouter();

  return (
    <section className="py-20 lg:py-24">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink-900 via-ink-900 to-accent-800 px-6 py-14 sm:px-14 sm:py-20 text-center shadow-glow-lg">
            {/* decorative */}
            <div className="absolute inset-0 grid-bg opacity-10" />
            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-accent-500/30 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-ink-400/30 blur-3xl" />

            <div className="relative">
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
                Your next exam does not have to be a panic.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-ink-200 leading-relaxed">
                Join thousands of students studying smarter. Start free, upgrade when you need more.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  size="lg"
                  onClick={() => navigate('assistant')}
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                  className="bg-white text-ink-900 hover:bg-ink-50 from-white to-white shadow-none hover:shadow-none"
                >
                  Start studying free
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('about')}
                  className="border-white/30 text-white hover:bg-white/10 hover:text-white hover:border-white/50 bg-transparent"
                >
                  Learn more
                </Button>
              </div>

              <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-200">
                {perks.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-success-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
