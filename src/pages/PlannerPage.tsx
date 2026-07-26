import { useState } from 'react';
import {
  CalendarRange,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  User,
  BookOpen,
  ListTree,
  CalendarDays,
  Clock,
  Sun,
  Moon,
  Gauge,
  Download,
  BookCheck,
  Target,
  Trophy,
} from 'lucide-react';
import { ToolPage, type ToolMeta } from '@/components/tools/ToolPage';
import { useToast } from '@/components/ui/Toast';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { LoadingPanel } from '@/components/ui/Loading';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { generatePlan, type PlannerInput, type PlannerResult } from '@/services/ai';

const meta: ToolMeta = {
  icon: CalendarRange,
  label: 'Study Planner',
  title: 'Smart Study Planner',
  subtitle:
    'Tell it your subject, topics, exam date, and available hours — get a personalized day-by-day schedule with revision and practice days.',
  accent: 'from-ink-600 to-accent-600',
  badge: 'AI-powered',
};

const TOTAL_STEPS = 8;

const stepMeta = [
  { icon: User, label: 'Your name', hint: 'Optional — just for a friendly greeting.' },
  { icon: BookOpen, label: 'Subject', hint: 'What exam are you preparing for?' },
  { icon: ListTree, label: 'Topics', hint: 'List the topics you need to cover.' },
  { icon: CalendarDays, label: 'Exam date', hint: 'When is the exam?' },
  { icon: Clock, label: 'Study days', hint: 'How many days can you study before it?' },
  { icon: Clock, label: 'Hours per day', hint: 'How many hours each study day?' },
  { icon: Sun, label: 'Preferred time', hint: 'When do you focus best?' },
  { icon: Gauge, label: 'Difficulty', hint: 'How hard is the material for you?' },
];

const typeStyles: Record<string, string> = {
  Study: 'bg-accent-100 dark:bg-accent-900/40 text-accent-700 dark:text-accent-300',
  Revision: 'bg-warning-100 dark:bg-warning-900/40 text-warning-600 dark:text-warning-400',
  'Practice Quiz': 'bg-success-100 dark:bg-success-900/40 text-success-700 dark:text-success-400',
  'Final Revision': 'bg-ink-900 dark:bg-ink-700 text-white',
};

const typeIcons: Record<string, typeof BookOpen> = {
  Study: BookOpen,
  Revision: RotateCcw,
  'Practice Quiz': BookCheck,
  'Final Revision': Trophy,
};

export function PlannerPage() {
  const toast = useToast();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<PlannerInput>({
    studentName: '',
    subject: '',
    topics: '',
    examDate: '',
    studyDays: 7,
    hoursPerDay: 2,
    preferredTime: 'Evening',
    difficulty: 'Medium',
  });
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<PlannerResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const update = (patch: Partial<PlannerInput>) => setForm((f) => ({ ...f, ...patch }));

  const canAdvance = () => {
    if (step === 0) return true; // name optional
    if (step === 1) return form.subject.trim().length > 0;
    if (step === 2) return form.topics.trim().length > 0;
    if (step === 3) return form.examDate.trim().length > 0;
    if (step === 4) return form.studyDays > 0 && form.studyDays <= 60;
    if (step === 5) return form.hoursPerDay > 0 && form.hoursPerDay <= 12;
    if (step === 6) return form.preferredTime.trim().length > 0;
    if (step === 7) return true;
    return true;
  };

  const next = () => setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const generate = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generatePlan(form);
      setPlan(result);
      toast('Your study plan is ready', 'success');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Could not generate your plan. Try again.';
      setError(msg);
      toast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const regenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generatePlan(form);
      setPlan(result);
      toast('Schedule regenerated', 'success');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Could not regenerate. Try again.';
      setError(msg);
      toast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const restart = () => {
    setPlan(null);
    setStep(0);
    setError(null);
  };

  const downloadPlan = () => {
    if (!plan) return;
    const lines = [
      `EXAM BUDDY AI — STUDY PLAN`,
      `Student: ${plan.studentName}`,
      `Subject: ${plan.subject}`,
      `Exam date: ${plan.examDate}`,
      '',
      plan.summary,
      '',
      'DAY-BY-DAY SCHEDULE',
      ...plan.days.map(
        (d) =>
          `Day ${d.day} · ${d.date} · ${d.type} · ${d.duration}\n  Focus: ${d.focus}\n  Topics: ${d.topics.join(', ')}`,
      ),
    ].join('\n');
    const blob = new Blob([lines], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exam-buddy-study-plan.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast('Plan downloaded', 'success');
  };

  return (
    <ToolPage meta={meta}>
      {loading && (
        <Card className="mb-6">
          <LoadingPanel label="Building your personalized study schedule" />
        </Card>
      )}

      {error && !loading && (
        <ErrorBanner className="mb-6" message={error} onRetry={plan ? regenerate : generate} onDismiss={() => setError(null)} />
      )}

      {plan && !loading ? (
        <PlanResult plan={plan} onRegenerate={regenerate} onRestart={restart} onDownload={downloadPlan} />
      ) : !loading ? (
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            <Card className="p-6 sm:p-8">
              {/* progress */}
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold uppercase tracking-wider text-accent-600 dark:text-accent-400">
                  Step {step + 1} of {TOTAL_STEPS}
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${
                        i <= step ? 'w-6 bg-accent-500' : 'w-3 bg-ink-200 dark:bg-ink-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-6">
                {renderStep(step, form, update)}
              </div>

              <div className="mt-8 flex items-center justify-between">
                <Button variant="ghost" size="sm" onClick={back} disabled={step === 0} leftIcon={<ArrowLeft className="h-4 w-4" />}>
                  Back
                </Button>
                {step < TOTAL_STEPS - 1 ? (
                  <Button size="sm" onClick={next} disabled={!canAdvance()} rightIcon={<ArrowRight className="h-4 w-4" />}>
                    Next
                  </Button>
                ) : (
                  <Button size="sm" onClick={generate} leftIcon={<Sparkles className="h-4 w-4" />}>
                    Generate plan
                  </Button>
                )}
              </div>
            </Card>
          </div>

          {/* Summary sidebar */}
          <div className="lg:col-span-2">
            <Card className="p-6 lg:sticky lg:top-24">
              <div className="flex items-center gap-2 text-ink-900 dark:text-ink-50">
                <Target className="h-5 w-5 text-accent-600 dark:text-accent-400" />
                <h3 className="font-display text-lg font-bold">Plan summary</h3>
              </div>
              <dl className="mt-4 space-y-3 text-sm">
                <SummaryRow label="Student" value={form.studentName || '—'} />
                <SummaryRow label="Subject" value={form.subject || '—'} />
                <SummaryRow label="Topics" value={form.topics || '—'} />
                <SummaryRow label="Exam date" value={form.examDate || '—'} />
                <SummaryRow label="Study days" value={String(form.studyDays)} />
                <SummaryRow label="Hours / day" value={String(form.hoursPerDay)} />
                <SummaryRow label="Preferred time" value={form.preferredTime} />
                <SummaryRow label="Difficulty" value={form.difficulty} />
              </dl>
              <div className="mt-5 rounded-xl bg-accent-50 dark:bg-accent-900/30 p-3.5">
                <div className="text-xs font-semibold text-accent-700 dark:text-accent-300">Total study time</div>
                <div className="mt-0.5 font-display text-2xl font-bold text-ink-900 dark:text-ink-50">
                  {form.studyDays * form.hoursPerDay} hours
                </div>
                <div className="text-xs text-ink-500 dark:text-ink-400">across {form.studyDays} days</div>
              </div>
            </Card>
          </div>
        </div>
      ) : null}
    </ToolPage>
  );
}

function renderStep(step: number, form: PlannerInput, update: (p: Partial<PlannerInput>) => void) {
  const meta = stepMeta[step];
  const Icon = meta.icon;

  return (
    <div className="animate-fade-up">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-50 dark:bg-accent-900/40 text-accent-600 dark:text-accent-300">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-display text-xl font-bold text-ink-900 dark:text-ink-50">{meta.label}</h2>
          <p className="text-sm text-ink-500 dark:text-ink-400">{meta.hint}</p>
        </div>
      </div>

      <div className="mt-6">
        {step === 0 && (
          <input
            value={form.studentName}
            onChange={(e) => update({ studentName: e.target.value })}
            placeholder="e.g. Sharla (optional)"
            className="w-full rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 px-4 py-3 text-sm text-ink-900 dark:text-ink-100 placeholder:text-ink-400 focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-500/20 transition-all"
          />
        )}
        {step === 1 && (
          <input
            value={form.subject}
            onChange={(e) => update({ subject: e.target.value })}
            placeholder="e.g. Data Structures and Algorithms"
            className="w-full rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 px-4 py-3 text-sm text-ink-900 dark:text-ink-100 placeholder:text-ink-400 focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-500/20 transition-all"
          />
        )}
        {step === 2 && (
          <textarea
            value={form.topics}
            onChange={(e) => update({ topics: e.target.value })}
            rows={5}
            placeholder="e.g. Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Sorting, Hashing"
            className="w-full resize-none rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 px-4 py-3 text-sm text-ink-900 dark:text-ink-100 placeholder:text-ink-400 focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-500/20 transition-all"
          />
        )}
        {step === 3 && (
          <input
            type="date"
            value={form.examDate}
            onChange={(e) => update({ examDate: e.target.value })}
            className="w-full rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 px-4 py-3 text-sm text-ink-900 dark:text-ink-100 focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-500/20 transition-all"
          />
        )}
        {step === 4 && (
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={1}
              max={30}
              value={form.studyDays}
              onChange={(e) => update({ studyDays: Number(e.target.value) })}
              className="flex-1 accent-accent-600"
            />
            <span className="w-16 text-center font-display text-2xl font-bold text-ink-900 dark:text-ink-50">
              {form.studyDays}
            </span>
          </div>
        )}
        {step === 5 && (
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={1}
              max={10}
              value={form.hoursPerDay}
              onChange={(e) => update({ hoursPerDay: Number(e.target.value) })}
              className="flex-1 accent-accent-600"
            />
            <span className="w-16 text-center font-display text-2xl font-bold text-ink-900 dark:text-ink-50">
              {form.hoursPerDay}h
            </span>
          </div>
        )}
        {step === 6 && (
          <div className="grid grid-cols-3 gap-2">
            {['Morning', 'Afternoon', 'Evening'].map((t) => {
              const Icon = t === 'Morning' ? Sun : t === 'Afternoon' ? Sun : Moon;
              return (
                <button
                  key={t}
                  onClick={() => update({ preferredTime: t })}
                  className={`flex flex-col items-center gap-2 rounded-xl border px-3 py-4 transition-all ${
                    form.preferredTime === t
                      ? 'border-accent-400 bg-accent-50 dark:bg-accent-900/40 text-accent-700 dark:text-accent-300'
                      : 'border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{t}</span>
                </button>
              );
            })}
          </div>
        )}
        {step === 7 && (
          <div className="grid grid-cols-3 gap-2">
            {(['Easy', 'Medium', 'Hard'] as const).map((d) => (
              <button
                key={d}
                onClick={() => update({ difficulty: d })}
                className={`rounded-xl border px-3 py-4 text-sm font-semibold capitalize transition-all ${
                  form.difficulty === d
                    ? 'border-accent-400 bg-accent-50 dark:bg-accent-900/40 text-accent-700 dark:text-accent-300'
                    : 'border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-ink-100 dark:border-ink-800 pb-2.5">
      <dt className="text-ink-500 dark:text-ink-400">{label}</dt>
      <dd className="truncate font-medium text-ink-900 dark:text-ink-100 text-right">{value}</dd>
    </div>
  );
}

function PlanResult({
  plan,
  onRegenerate,
  onRestart,
  onDownload,
}: {
  plan: PlannerResult;
  onRegenerate: () => void;
  onRestart: () => void;
  onDownload: () => void;
}) {
  return (
    <div className="animate-fade-up">
      {/* Header card */}
      <Card className="overflow-hidden">
        <div className="relative bg-gradient-to-br from-ink-900 via-ink-900 to-accent-800 p-7 text-white">
          <div className="absolute inset-0 grid-bg opacity-10" />
          <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-accent-500/30 blur-3xl" />
          <div className="relative">
            <Badge className="bg-white/10 text-white border border-white/20">
              <CalendarRange className="h-3.5 w-3.5" />
              Your study plan
            </Badge>
            <h2 className="mt-4 font-display text-3xl font-bold">
              {plan.studentName}'s plan for {plan.subject}
            </h2>
            <p className="mt-2 text-sm text-ink-200">Exam date: {plan.examDate} · {plan.days.length} days of study</p>
            {plan.summary && <p className="mt-4 max-w-2xl text-sm text-ink-200 leading-relaxed">{plan.summary}</p>}
          </div>
        </div>
      </Card>

      {/* Schedule table */}
      <Card className="mt-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-ink-100 dark:border-ink-800 bg-ink-50/60 dark:bg-ink-800/40">
                <th className="px-5 py-3.5 font-semibold text-ink-500 dark:text-ink-400">Day</th>
                <th className="px-5 py-3.5 font-semibold text-ink-500 dark:text-ink-400">Date</th>
                <th className="px-5 py-3.5 font-semibold text-ink-500 dark:text-ink-400">Type</th>
                <th className="px-5 py-3.5 font-semibold text-ink-500 dark:text-ink-400">Focus</th>
                <th className="hidden md:table-cell px-5 py-3.5 font-semibold text-ink-500 dark:text-ink-400">Topics</th>
                <th className="px-5 py-3.5 font-semibold text-ink-500 dark:text-ink-400">Duration</th>
              </tr>
            </thead>
            <tbody>
              {plan.days.map((d, i) => {
                const TypeIcon = typeIcons[d.type] ?? BookOpen;
                return (
                  <tr
                    key={i}
                    className="border-b border-ink-100 dark:border-ink-800 transition-colors hover:bg-ink-50/60 dark:hover:bg-ink-800/30"
                  >
                    <td className="px-5 py-4 font-bold text-ink-900 dark:text-ink-50">{d.day}</td>
                    <td className="px-5 py-4 text-ink-600 dark:text-ink-300">{d.date}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${typeStyles[d.type] ?? 'bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-300'}`}>
                        <TypeIcon className="h-3.5 w-3.5" />
                        {d.type}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-medium text-ink-700 dark:text-ink-200">{d.focus}</td>
                    <td className="hidden md:table-cell px-5 py-4 text-ink-500 dark:text-ink-400">
                      <div className="flex flex-wrap gap-1">
                        {d.topics.map((t, j) => (
                          <span key={j} className="rounded-md bg-ink-100 dark:bg-ink-800 px-2 py-0.5 text-xs">{t}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-ink-500 dark:text-ink-400 whitespace-nowrap">{d.duration}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button onClick={onRegenerate} leftIcon={<RotateCcw className="h-4 w-4" />}>
          Regenerate schedule
        </Button>
        <Button variant="outline" onClick={onDownload} leftIcon={<Download className="h-4 w-4" />}>
          Download plan
        </Button>
        <Button variant="ghost" onClick={onRestart} leftIcon={<ArrowLeft className="h-4 w-4" />}>
          Start over
        </Button>
        <span className="ml-auto text-xs text-ink-400 dark:text-ink-500">Generated by AI · adjust to fit your week</span>
      </div>
    </div>
  );
}
