import { Target, Heart, Globe, GraduationCap } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { Card } from '@/components/ui/Card';

const stats = [
  { value: '12k+', label: 'Active students' },
  { value: '480k', label: 'Quizzes generated' },
  { value: '37', label: 'Universities' },
  { value: '4.9★', label: 'Average rating' },
];

const values = [
  {
    icon: Target,
    title: 'Outcomes over output',
    desc: 'We measure success by your grades and confidence — not time spent staring at a screen.',
  },
  {
    icon: Heart,
    title: 'Student-first, always',
    desc: 'Built by people who remember finals week. Every feature starts from a real student pain point.',
  },
  {
    icon: Globe,
    title: 'Accessible learning',
    desc: 'A free tier that is genuinely useful, so the best study tools are not just for those who can pay.',
  },
  {
    icon: GraduationCap,
    title: 'Honest AI',
    desc: 'AI that explains, cites, and admits when it is unsure. No pretending to know what it does not.',
  },
];

export function About() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-accent-600 dark:text-accent-400 mb-3">
                About Exam Buddy AI
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold leading-[1.1] text-ink-900 dark:text-ink-50 tracking-tight">
                We built the study tool we wished we had in undergrad
              </h2>
              <p className="mt-5 text-lg text-ink-500 dark:text-ink-400 leading-relaxed">
                Exam Buddy AI started as a side project during finals week — a script that turned
                lecture notes into flashcards. Today it is a full study companion used by thousands
                of students across six continents.
              </p>
              <p className="mt-4 text-base text-ink-500 dark:text-ink-400 leading-relaxed">
                Our mission is simple: make high-quality, personalized studying available to every
                university student, regardless of budget or background. Because the night before an
                exam should feel prepared, not panicked.
              </p>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-xl bg-white dark:bg-ink-900 border border-ink-100 dark:border-ink-800 px-4 py-3.5">
                    <div className="font-display text-2xl font-bold gradient-text">{s.value}</div>
                    <div className="text-xs text-ink-500 dark:text-ink-400 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid gap-4 sm:grid-cols-2">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <Card key={v.title} hover className="p-5">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-50 dark:bg-accent-900/40 text-accent-600 dark:text-accent-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-semibold text-ink-900 dark:text-ink-50">{v.title}</h3>
                    <p className="mt-1.5 text-sm text-ink-500 dark:text-ink-400 leading-relaxed">{v.desc}</p>
                  </Card>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
