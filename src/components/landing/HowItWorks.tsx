import { Upload, Wand2, Brain, Trophy } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/Reveal';

const steps = [
  {
    icon: Upload,
    title: 'Add your material',
    desc: 'Paste lecture notes, upload a PDF, or just type a topic. Exam Buddy pulls the key concepts automatically.',
  },
  {
    icon: Wand2,
    title: 'Pick what you need',
    desc: 'Generate a quiz, summarize a chapter, or build a study plan — each tool is one click away.',
  },
  {
    icon: Brain,
    title: 'Study with feedback',
    desc: 'Practice with instant explanations, track what you miss, and let the AI focus your next session.',
  },
  {
    icon: Trophy,
    title: 'Walk in confident',
    desc: 'Arrive at exam day with a clear picture of what you know — and what still needs one more pass.',
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 dotted-bg opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title={<>From scattered notes to exam-ready in four steps</>}
            subtitle="No setup, no learning curve. Drop in your material and the AI does the heavy lifting."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i * 90}>
                <div className="relative h-full">
                  {/* connector line */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-[calc(50%+2.5rem)] right-[-50%] h-px bg-gradient-to-r from-accent-300 to-transparent" />
                  )}
                  <div className="relative flex flex-col items-start">
                    <div className="relative">
                      <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white border border-ink-100 shadow-card text-accent-600">
                        <Icon className="h-7 w-7" />
                      </div>
                      <span className="absolute -top-2 -right-2 grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-accent-600 to-ink-600 text-xs font-bold text-white shadow-glow">
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-lg font-bold text-ink-900 dark:text-ink-50">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
