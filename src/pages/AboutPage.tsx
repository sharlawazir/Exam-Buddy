import {
  Target,
  Heart,
  Globe,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Mail,
  MapPin,
  Brain,
  ListChecks,
  FileText,
  CalendarRange,
  Flame,
  MessageSquare,
  Code2,
  Database,
  Cloud,
  Palette,
  CheckCircle2,
} from 'lucide-react';
import { useRouter } from '@/router/Router';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const stats = [
  { value: '5', label: 'AI-powered tools' },
  { value: '8', label: 'Response sections' },
  { value: '10', label: 'Quiz questions / run' },
  { value: '100%', label: 'Frontend coverage' },
];

const problemPoints = [
  'Students drown in dense lecture notes with no clear path through them.',
  'Generic study apps do not adapt to a specific syllabus or exam date.',
  'Motivation collapses during long revision stretches with no feedback loop.',
  'Time is wasted re-reading instead of practicing active recall.',
];

const features = [
  { icon: Sparkles, title: 'AI Study Assistant', desc: 'A professional tutor that answers with definitions, step-by-step explanations, worked examples, common mistakes, and a 5-question practice quiz.' },
  { icon: ListChecks, title: 'Quiz Generator', desc: 'Enter any topic and get 10 multiple-choice questions with four options, the correct answer, and a short explanation for each.' },
  { icon: FileText, title: 'Notes Summarizer', desc: 'Paste long notes and receive a structured summary: overview, key points, keywords, exam tips, viva questions, and quick revision notes.' },
  { icon: CalendarRange, title: 'Smart Study Planner', desc: 'A multi-step planner that turns your subject, topics, exam date, and available hours into a day-by-day schedule with revision and practice days.' },
  { icon: Flame, title: 'Motivation Generator', desc: 'A Motivate Me button that produces personalised, exam-focused encouragement in beautifully animated cards.' },
];

const techStack = [
  { icon: Code2, name: 'React + TypeScript', desc: 'Type-safe component architecture' },
  { icon: Palette, name: 'Tailwind CSS', desc: 'Utility-first styling with dark mode' },
  { icon: Brain, name: 'OpenAI GPT-4o mini', desc: 'Powers all five AI tools' },
  { icon: Cloud, name: 'Supabase Edge Functions', desc: 'Secure server-side AI proxy' },
  { icon: Database, name: 'Supabase', desc: 'Backend and secret storage' },
  { icon: Sparkles, name: 'Lucide Icons', desc: 'Consistent iconography throughout' },
];

const aiCapabilities = [
  'Structured academic responses with eight labelled sections',
  'JSON-validated quiz and summary generation',
  'Context-aware chat that remembers conversation history',
  'Personalised study scheduling from natural-language inputs',
  'Tone-aware motivational message generation',
  'Server-side key management — the API key never reaches the browser',
];

const values = [
  { icon: Target, title: 'Outcomes over output', desc: 'We measure success by your grades and confidence — not time spent staring at a screen.' },
  { icon: Heart, title: 'Student-first, always', desc: 'Built by people who remember finals week. Every feature starts from a real student pain point.' },
  { icon: Globe, title: 'Accessible learning', desc: 'A free tier that is genuinely useful, so the best study tools are not just for those who can pay.' },
  { icon: GraduationCap, title: 'Honest AI', desc: 'AI that explains, cites, and admits when it is unsure. No pretending to know what it does not.' },
];

const timeline = [
  { year: 'Phase 1', title: 'Foundation', desc: 'Designed the landing page, routing, and a reusable UI component library.' },
  { year: 'Phase 2', title: 'Core functionality', desc: 'Built interactive shells for all five tools with mock data and shared components.' },
  { year: 'Phase 3', title: 'Production AI', desc: 'Connected real OpenAI via a secure edge function, added dark mode, toasts, and polish.' },
];

export function AboutPage() {
  const { navigate } = useRouter();

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="relative overflow-hidden pt-28 pb-12 lg:pt-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-[640px] rounded-full bg-gradient-to-br from-accent-200/40 to-transparent blur-3xl dark:from-accent-500/20" />
        </div>
        <div className="container-page">
          <Reveal>
            <Badge variant="accent" className="mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              About the project
            </Badge>
            <h1 className="max-w-3xl font-display text-4xl sm:text-5xl font-bold tracking-tight text-ink-900 dark:text-ink-50 leading-[1.08]">
              An AI study companion built as a university final project
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-ink-500 dark:text-ink-400 leading-relaxed">
              Exam Buddy AI is a production-ready web application that uses large language models to
              help university students prepare for exams — through an AI tutor, a quiz generator, a
              notes summarizer, a smart study planner, and a motivation tool.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Stats */}
      <div className="container-page">
        <Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-white dark:bg-ink-900 border border-ink-100 dark:border-ink-800 px-5 py-6 text-center shadow-soft">
                <div className="font-display text-3xl font-bold gradient-text">{s.value}</div>
                <div className="mt-1 text-xs text-ink-500 dark:text-ink-400">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Project overview */}
      <section className="py-20">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <div>
                <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-accent-600 dark:text-accent-400 mb-3">
                  Project overview
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink-900 dark:text-ink-50 leading-[1.1] tracking-tight">
                  One toolkit for the whole exam season
                </h2>
                <p className="mt-5 text-ink-500 dark:text-ink-400 leading-relaxed">
                  Exam Buddy AI brings five focused AI tools into a single, polished interface. Each
                  tool is designed around a real step in the study cycle — understanding, practicing,
                  condensing, planning, and staying motivated — so students get a complete workflow
                  rather than a single chat box.
                </p>
                <p className="mt-4 text-ink-500 dark:text-ink-400 leading-relaxed">
                  The frontend is built with React, TypeScript, and Tailwind CSS. AI requests are
                  proxied through a Supabase Edge Function that holds the OpenAI key as a server-side
                  secret, so the key never appears in the browser bundle.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <Card className="p-7">
                <div className="flex items-center gap-2 text-ink-900 dark:text-ink-50">
                  <Target className="h-5 w-5 text-accent-600 dark:text-accent-400" />
                  <h3 className="font-display text-lg font-bold">Problem solved</h3>
                </div>
                <ul className="mt-5 space-y-3">
                  {problemPoints.map((p, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-ink-600 dark:text-ink-300">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-danger-500" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="pb-20">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Features"
              title={<>Five tools that cover the full study cycle</>}
              subtitle="Each tool is self-contained and powered by the same secure AI backend."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.title} delay={i * 70}>
                  <Card hover className="group h-full p-6 flex flex-col">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 to-ink-600 text-white shadow-glow">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-bold text-ink-900 dark:text-ink-50">{f.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{f.desc}</p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="pb-20">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Technologies used"
              title={<>A modern, type-safe stack</>}
              subtitle="Chosen for developer experience, performance, and a secure AI integration."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {techStack.map((t, i) => {
              const Icon = t.icon;
              return (
                <Reveal key={t.name} delay={i * 60}>
                  <Card hover className="p-5 flex items-start gap-3.5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-50 dark:bg-accent-900/40 text-accent-600 dark:text-accent-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="font-semibold text-ink-900 dark:text-ink-50">{t.name}</div>
                      <div className="text-sm text-ink-500 dark:text-ink-400">{t.desc}</div>
                    </div>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI capabilities */}
      <section className="pb-20">
        <div className="container-page">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink-900 via-ink-900 to-accent-800 p-8 sm:p-12 text-white shadow-glow-lg">
              <div className="absolute inset-0 grid-bg opacity-10" />
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-accent-500/30 blur-3xl" />
              <div className="relative">
                <Badge className="bg-white/10 text-white border border-white/20 mb-4">
                  <Brain className="h-3.5 w-3.5" />
                  AI capabilities
                </Badge>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
                  How the AI works under the hood
                </h2>
                <p className="mt-4 max-w-2xl text-ink-200 leading-relaxed">
                  A single Supabase Edge Function routes every request to OpenAI with carefully
                  engineered prompts per tool. The API key stays on the server — the browser only
                  ever talks to your own function.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {aiCapabilities.map((c) => (
                    <div key={c} className="flex items-start gap-2.5 text-sm text-ink-100">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success-400" />
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="pb-20">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="What we believe"
              title={<>Principles that shape every feature</>}
              subtitle="Four values held to when deciding what to build next."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal key={v.title} delay={i * 80}>
                  <Card hover className="p-6 h-full">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 dark:bg-accent-900/40 text-accent-600 dark:text-accent-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-semibold text-ink-900 dark:text-ink-50">{v.title}</h3>
                    <p className="mt-1.5 text-sm text-ink-500 dark:text-ink-400 leading-relaxed">{v.desc}</p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="pb-20">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Build journey"
              title={<>Three phases, one polished app</>}
              align="left"
            />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 90}>
                <Card className="p-6 h-full">
                  <div className="font-display text-sm font-bold text-accent-600 dark:text-accent-400">{t.year}</div>
                  <h3 className="mt-2 font-display text-lg font-bold text-ink-900 dark:text-ink-50">{t.title}</h3>
                  <p className="mt-2 text-sm text-ink-500 dark:text-ink-400 leading-relaxed">{t.desc}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="pb-10">
        <div className="container-page">
          <Reveal>
            <Card className="p-7 sm:p-10">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink-900 dark:text-ink-50">
                    Have a question about this project?
                  </h2>
                  <p className="mt-3 text-ink-500 dark:text-ink-400 leading-relaxed">
                    This application was built as a university final project by Sharla Wazir. Whether
                    it is feedback, a question, or a collaboration idea — reach out anytime.
                  </p>
                  <div className="mt-6 space-y-3 text-sm">
                    <div className="flex items-center gap-3 text-ink-700 dark:text-ink-200">
                      <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-50 dark:bg-accent-900/40 text-accent-600 dark:text-accent-300">
                        <Mail className="h-4 w-4" />
                      </span>
                      sharla.wazir@example.com
                    </div>
                    <div className="flex items-center gap-3 text-ink-700 dark:text-ink-200">
                      <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-50 dark:bg-accent-900/40 text-accent-600 dark:text-accent-300">
                        <MapPin className="h-4 w-4" />
                      </span>
                      University final project · 2026
                    </div>
                  </div>
                  <div className="mt-7">
                    <Button onClick={() => navigate('assistant')} rightIcon={<ArrowRight className="h-4 w-4" />}>
                      Try Exam Buddy
                    </Button>
                  </div>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="grid gap-3">
                  <input
                    placeholder="Your name"
                    className="rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 px-4 py-3 text-sm text-ink-900 dark:text-ink-100 placeholder:text-ink-400 focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-500/20"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    className="rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 px-4 py-3 text-sm text-ink-900 dark:text-ink-100 placeholder:text-ink-400 focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-500/20"
                  />
                  <textarea
                    rows={4}
                    placeholder="Tell us what is on your mind…"
                    className="resize-none rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 px-4 py-3 text-sm text-ink-900 dark:text-ink-100 placeholder:text-ink-400 focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-500/20"
                  />
                  <Button type="submit" leftIcon={<MessageSquare className="h-4 w-4" />}>
                    Send message
                  </Button>
                </form>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
