import { useState } from 'react';
import {
  FileText,
  Upload,
  Sparkles,
  Download,
  ListTree,
  Lightbulb,
  Hash,
  GraduationCap,
  HelpCircle,
  Eraser,
  Zap,
} from 'lucide-react';
import { ToolPage, type ToolMeta } from '@/components/tools/ToolPage';
import { useToast } from '@/components/ui/Toast';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CopyButton } from '@/components/ui/CopyButton';
import { LoadingPanel } from '@/components/ui/Loading';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { summarizeNotes, type NotesSummary } from '@/services/ai';

const meta: ToolMeta = {
  icon: FileText,
  label: 'Notes Summarizer',
  title: 'Notes Summarizer',
  subtitle:
    'Paste long lecture notes and get a structured summary — overview, key points, keywords, exam tips, viva questions, and quick revision notes.',
  accent: 'from-warning-500 to-accent-500',
  badge: 'AI-powered',
};

const sampleText = `Photosynthesis is the process by which green plants, algae, and some bacteria convert light energy into chemical energy stored in glucose. It takes place mainly in the chloroplasts, which contain a green pigment called chlorophyll. Chlorophyll absorbs light most strongly in the red and blue regions of the spectrum and reflects green, which is why plants appear green.

The process has two stages. The light-dependent reactions occur in the thylakoid membranes. Here, water is split, releasing oxygen, and the energy is used to produce ATP and NADPH. The Calvin cycle takes place in the stroma and uses ATP and NADPH to fix carbon dioxide into glucose, with the help of an enzyme called RuBisCO.

The overall equation is 6CO2 + 6H2O + light energy produces C6H12O6 + 6O2. Several factors affect the rate of photosynthesis, including light intensity, carbon dioxide concentration, and temperature. If any one of these is too low, it becomes the limiting factor.`;

const MAX_CHARS = 12000;

type Phase = 'idle' | 'loading' | 'ready';

export function NotesPage() {
  const toast = useToast();
  const [text, setText] = useState('');
  const [length, setLength] = useState<'brief' | 'standard' | 'detailed'>('standard');
  const [phase, setPhase] = useState<Phase>('idle');
  const [summary, setSummary] = useState<NotesSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
  const overLimit = charCount > MAX_CHARS;

  const run = async (source: string) => {
    const value = source.trim();
    if (!value) {
      toast('Please paste some notes first', 'error');
      return;
    }
    if (overLimit) {
      toast(`Notes are too long (max ${MAX_CHARS.toLocaleString()} characters)`, 'error');
      return;
    }
    setPhase('loading');
    setError(null);
    try {
      const result = await summarizeNotes(value);
      setSummary(result);
      setPhase('ready');
      toast('Summary generated', 'success');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Could not summarize your notes. Try again.';
      setError(msg);
      setPhase('idle');
      toast(msg, 'error');
    }
  };

  const clearAll = () => {
    setText('');
    setSummary(null);
    setPhase('idle');
    setError(null);
  };

  const downloadSummary = () => {
    if (!summary) return;
    const blob = new Blob([downloadText(summary)], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exam-buddy-summary.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast('Summary downloaded', 'success');
  };

  return (
    <ToolPage meta={meta}>
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input */}
        <Card className="flex flex-col p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-ink-900 dark:text-ink-50">
              <FileText className="h-5 w-5 text-accent-600 dark:text-accent-400" />
              <h2 className="font-display text-lg font-bold">Your notes</h2>
            </div>
            {text && (
              <button
                onClick={clearAll}
                className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-ink-400 dark:text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-800 hover:text-ink-700 dark:hover:text-ink-200 transition-colors"
              >
                <Eraser className="h-3.5 w-3.5" />
                Clear
              </button>
            )}
          </div>

          <div className="mt-4 rounded-xl border-2 border-dashed border-ink-200 dark:border-ink-700 bg-ink-50/50 dark:bg-ink-800/30 px-4 py-5 text-center transition-colors hover:border-accent-300 hover:bg-accent-50/40 dark:hover:bg-accent-900/20">
            <Upload className="mx-auto h-7 w-7 text-ink-400 dark:text-ink-500" />
            <p className="mt-2 text-sm font-medium text-ink-600 dark:text-ink-300">Drop a PDF, or paste your text below</p>
            <p className="text-xs text-ink-400 dark:text-ink-500">Supports .pdf, .txt, .docx up to 20MB</p>
          </div>

          <div className="my-3 flex items-center gap-3 text-xs text-ink-400 dark:text-ink-500">
            <span className="h-px flex-1 bg-ink-100 dark:bg-ink-800" />
            or paste text
            <span className="h-px flex-1 bg-ink-100 dark:bg-ink-800" />
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS + 200))}
            rows={10}
            placeholder="Paste your lecture notes, chapter text, or any study material here…"
            className={`w-full flex-1 resize-none rounded-xl border bg-white dark:bg-ink-900 px-3.5 py-3 text-sm leading-relaxed text-ink-900 dark:text-ink-100 placeholder:text-ink-400 focus:outline-none focus:ring-2 transition-all ${
              overLimit
                ? 'border-danger-400 focus:ring-danger-500/20'
                : 'border-ink-200 dark:border-ink-700 focus:border-accent-400 focus:ring-accent-500/20'
            }`}
          />

          {/* Character counter */}
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-ink-400 dark:text-ink-500">
              {wordCount.toLocaleString()} words ·{' '}
              <span className={overLimit ? 'font-semibold text-danger-600 dark:text-danger-400' : ''}>
                {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()} characters
              </span>
            </span>
            <button
              onClick={() => setText(sampleText)}
              className="font-medium text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 transition-colors"
            >
              Load sample notes
            </button>
          </div>

          <div className="mt-4">
            <div className="text-sm font-semibold text-ink-700 dark:text-ink-200">Summary length</div>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {(['brief', 'standard', 'detailed'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLength(l)}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium capitalize transition-all ${
                    length === l
                      ? 'border-accent-400 bg-accent-50 dark:bg-accent-900/40 text-accent-700 dark:text-accent-300'
                      : 'border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <Button
            className="mt-5"
            loading={phase === 'loading'}
            disabled={!text.trim() || overLimit}
            leftIcon={<Sparkles className="h-4 w-4" />}
            onClick={() => run(text)}
          >
            Summarize notes
          </Button>
          {error && <ErrorBanner className="mt-3" message={error} onRetry={() => run(text)} onDismiss={() => setError(null)} />}
        </Card>

        {/* Output */}
        <div className="space-y-5">
          {phase === 'idle' && !summary && (
            <Card className="flex h-full min-h-[420px] flex-col items-center justify-center p-6 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-ink-100 dark:bg-ink-800 text-ink-400 dark:text-ink-500">
                <ListTree className="h-7 w-7" />
              </div>
              <p className="mt-4 text-sm font-medium text-ink-600 dark:text-ink-300">Your summary will appear here</p>
              <p className="mt-1 max-w-xs text-xs text-ink-400 dark:text-ink-500">
                Paste your notes and hit summarize to get key points, keywords, exam tips, viva questions, and quick revision notes.
              </p>
              <Button size="sm" variant="ghost" className="mt-4" onClick={() => setText(sampleText)}>
                Try with sample notes
              </Button>
            </Card>
          )}

          {phase === 'loading' && (
            <Card className="p-6">
              <LoadingPanel label="Summarizing your notes" />
            </Card>
          )}

          {phase === 'ready' && summary && (
            <>
              {/* Summary card with overview */}
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-ink-900 dark:text-ink-50">
                    <ListTree className="h-5 w-5 text-accent-600 dark:text-accent-400" />
                    <h2 className="font-display text-lg font-bold">Summary</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <CopyButton text={summary.overview} label="Copy" />
                    <button
                      onClick={downloadSummary}
                      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-ink-400 dark:text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-800 hover:text-ink-700 dark:hover:text-ink-200 transition-colors"
                      aria-label="Download"
                    >
                      <Download className="h-3.5 w-3.5" />
                      .txt
                    </button>
                  </div>
                </div>
                <div className="mt-4 rounded-xl bg-accent-50 dark:bg-accent-900/30 p-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent-700 dark:text-accent-300">
                    <Lightbulb className="h-3.5 w-3.5" />
                    Overview
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-700 dark:text-ink-200">{summary.overview}</p>
                </div>
              </Card>

              {/* Key points */}
              <SummarySection icon={ListTree} title="Key Points" accent="text-accent-600 dark:text-accent-300 bg-accent-50 dark:bg-accent-900/40">
                <ul className="space-y-2.5">
                  {summary.keyPoints.map((p, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-ink-700 dark:text-ink-200">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                      {p}
                    </li>
                  ))}
                </ul>
              </SummarySection>

              {/* Keywords */}
              <SummarySection icon={Hash} title="Important Keywords" accent="text-success-600 dark:text-success-400 bg-success-50 dark:bg-success-900/30">
                <div className="flex flex-wrap gap-2">
                  {summary.keywords.map((k) => (
                    <span
                      key={k}
                      className="inline-flex items-center rounded-full border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 px-3 py-1.5 text-xs font-medium text-ink-600 dark:text-ink-300"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </SummarySection>

              {/* Exam tips */}
              <SummarySection icon={GraduationCap} title="Exam Tips" accent="text-warning-600 dark:text-warning-400 bg-warning-50 dark:bg-warning-900/30">
                <ul className="space-y-2.5">
                  {summary.examTips.map((t, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-ink-700 dark:text-ink-200">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-warning-100 dark:bg-warning-900/40 text-xs font-bold text-warning-600 dark:text-warning-400">
                        {i + 1}
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </SummarySection>

              {/* Viva questions */}
              <SummarySection icon={HelpCircle} title="Possible Viva Questions" accent="text-ink-600 dark:text-ink-300 bg-ink-100 dark:bg-ink-800">
                <div className="space-y-2.5">
                  {summary.vivaQuestions.map((q, i) => (
                    <div key={i} className="flex items-start gap-2.5 rounded-lg border border-ink-100 dark:border-ink-800 bg-white dark:bg-ink-900 px-3.5 py-2.5">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-ink-900 dark:bg-ink-700 text-xs font-bold text-white">
                        Q{i + 1}
                      </span>
                      <span className="text-sm text-ink-700 dark:text-ink-200">{q}</span>
                    </div>
                  ))}
                </div>
              </SummarySection>

              {/* Quick revision notes */}
              <SummarySection icon={Zap} title="Quick Revision Notes" accent="text-accent-700 dark:text-accent-300 bg-accent-100 dark:bg-accent-900/50">
                <ul className="space-y-2.5">
                  {summary.quickRevisionNotes.map((n, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-ink-700 dark:text-ink-200">
                      <Zap className="mt-0.5 h-4 w-4 shrink-0 text-accent-600 dark:text-accent-400" />
                      {n}
                    </li>
                  ))}
                </ul>
              </SummarySection>

              <div className="flex items-center gap-2">
                <Badge variant="accent">
                  <Sparkles className="h-3 w-3" />
                  Generated by AI
                </Badge>
                <CopyButton text={downloadText(summary)} label="Copy all" />
              </div>
            </>
          )}
        </div>
      </div>
    </ToolPage>
  );
}

function SummarySection({
  icon: Icon,
  title,
  accent,
  children,
}: {
  icon: typeof FileText;
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2.5">
        <span className={`grid h-9 w-9 place-items-center rounded-lg ${accent}`}>
          <Icon className="h-4.5 w-4.5" />
        </span>
        <h3 className="font-display text-base font-bold text-ink-900 dark:text-ink-50">{title}</h3>
      </div>
      <div className="mt-4">{children}</div>
    </Card>
  );
}

function downloadText(s: NotesSummary): string {
  return [
    'EXAM BUDDY AI — NOTES SUMMARY',
    '===============================',
    '',
    'OVERVIEW',
    s.overview,
    '',
    'KEY POINTS',
    ...s.keyPoints.map((p, i) => `${i + 1}. ${p}`),
    '',
    'KEYWORDS',
    s.keywords.join(', '),
    '',
    'EXAM TIPS',
    ...s.examTips.map((t, i) => `${i + 1}. ${t}`),
    '',
    'VIVA QUESTIONS',
    ...s.vivaQuestions.map((q, i) => `${i + 1}. ${q}`),
    '',
    'QUICK REVISION NOTES',
    ...s.quickRevisionNotes.map((n, i) => `${i + 1}. ${n}`),
  ].join('\n');
}
