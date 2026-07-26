import { Sparkles, ListChecks, FileText, CalendarRange, Brain, ShieldCheck, Zap } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/Reveal';
import { useRouter } from '@/router/Router';
import type { RouteId } from '@/config/nav';

interface Feature {
  icon: typeof Sparkles;
  title: string;
  desc: string;
  route: RouteId;
  accent: string;
}

const features: Feature[] = [
  {
    icon: Sparkles,
    title: 'AI Assistant',
    desc: 'Ask any question about your syllabus and get clear, cited explanations — not walls of text. It remembers your courses and adapts to your level.',
    route: 'assistant',
    accent: 'from-accent-500 to-ink-600',
  },
  {
    icon: ListChecks,
    title: 'Quiz Generator',
    desc: 'Turn any notes or topic into practice quizzes with instant feedback. Mix multiple choice, true/false, and short answer in seconds.',
    route: 'quiz',
    accent: 'from-success-500 to-accent-600',
  },
  {
    icon: FileText,
    title: 'Notes Summarizer',
    desc: 'Paste a lecture, upload a chapter, and get crisp structured summaries with key terms and flashcards you can actually revise from.',
    route: 'notes',
    accent: 'from-warning-500 to-accent-500',
  },
  {
    icon: CalendarRange,
    title: 'Study Planner',
    desc: 'Tell it your exam dates and available hours — get a balanced day-by-day plan that adapts when life gets in the way.',
    route: 'planner',
    accent: 'from-ink-600 to-accent-600',
  },
  {
    icon: Brain,
    title: 'Adaptive learning',
    desc: 'The more you use it, the better it knows your weak spots. It prioritizes what you keep missing so time goes where it matters.',
    route: 'assistant',
    accent: 'from-accent-600 to-ink-700',
  },
  {
    icon: ShieldCheck,
    title: 'Private by design',
    desc: 'Your notes and study history stay yours. No selling data, no training on your content without consent — ever.',
    route: 'about',
    accent: 'from-ink-700 to-accent-700',
  },
];

export function Features() {
  const { navigate } = useRouter();

  return (
    <section className="py-20 lg:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Everything you need"
            title={<>One toolkit for the whole exam season</>}
            subtitle="Six focused tools that work together — from the first lecture to the night before the exam."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={f.title} delay={i * 70}>
                <Card hover className="group h-full p-6 flex flex-col">
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${f.accent} text-white shadow-glow`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-ink-900 dark:text-ink-50">{f.title}</h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{f.desc}</p>
                  <button
                    onClick={() => navigate(f.route)}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 dark:text-accent-300 group-hover:gap-2.5 transition-all"
                  >
                    Explore
                    <Zap className="h-4 w-4" />
                  </button>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
