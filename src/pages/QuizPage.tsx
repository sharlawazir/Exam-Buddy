import { useState } from 'react';
import {
  ListChecks,
  Sparkles,
  Check,
  X,
  RotateCcw,
  Trophy,
  ChevronRight,
  Lightbulb,
  Hash,
} from 'lucide-react';
import { ToolPage, type ToolMeta } from '@/components/tools/ToolPage';
import { useToast } from '@/components/ui/Toast';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { LoadingPanel } from '@/components/ui/Loading';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { generateQuiz, type QuizQuestion, type QuizResult } from '@/services/ai';

const meta: ToolMeta = {
  icon: ListChecks,
  label: 'Quiz Generator',
  title: 'Quiz Generator',
  subtitle:
    'Enter any topic and generate 10 multiple-choice questions with four options, the correct answer, and a short explanation for each.',
  accent: 'from-success-500 to-accent-600',
  badge: 'AI-powered',
};

const topicChips = ['Operating Systems', 'Cell Biology', 'Macroeconomics', 'Linear Algebra', 'Data Structures'];

type Phase = 'idle' | 'loading' | 'ready' | 'finished';

export function QuizPage() {
  const toast = useToast();
  const [topic, setTopic] = useState('');
  const [phase, setPhase] = useState<Phase>('idle');
  const [quiz, setQuiz] = useState<QuizResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [current, setCurrent] = useState(0);

  const run = async (t: string) => {
    const value = t.trim();
    if (!value) return;
    setTopic(value);
    setPhase('loading');
    setError(null);
    setAnswers({});
    setCurrent(0);
    try {
      const result = await generateQuiz(value);
      setQuiz(result);
      setPhase('ready');
      toast(`Generated ${result.questions.length} questions on "${result.topic}"`, 'success');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Could not generate the quiz. Try again.';
      setError(msg);
      setPhase('idle');
      toast(msg, 'error');
    }
  };

  const reset = () => {
    setPhase('idle');
    setQuiz(null);
    setAnswers({});
    setError(null);
    setCurrent(0);
  };

  const score = quiz ? quiz.questions.filter((q) => answers[q.id] === q.answerIndex).length : 0;

  return (
    <ToolPage meta={meta}>
      {/* Topic entry */}
      <Card className="p-6 sm:p-7">
        <div className="flex items-center gap-2 text-ink-900 dark:text-ink-50">
          <Sparkles className="h-5 w-5 text-accent-600 dark:text-accent-400" />
          <h2 className="font-display text-lg font-bold">What do you want to be quizzed on?</h2>
        </div>
        <p className="mt-1.5 text-sm text-ink-500 dark:text-ink-400">
          Type any subject or topic. The AI builds 10 multiple-choice questions you can take right here.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            run(topic);
          }}
          className="mt-5 flex flex-col gap-3 sm:flex-row"
        >
          <div className="flex-1 flex items-center gap-2 rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 px-3.5 py-1 focus-within:border-accent-400 focus-within:ring-2 focus-within:ring-accent-500/20 transition-all">
            <Hash className="h-4 w-4 text-ink-400" />
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Operating Systems"
              className="flex-1 bg-transparent py-2.5 text-sm text-ink-900 dark:text-ink-100 placeholder:text-ink-400 focus:outline-none"
            />
          </div>
          <Button type="submit" loading={phase === 'loading'} leftIcon={<ListChecks className="h-4 w-4" />}>
            Generate quiz
          </Button>
        </form>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-ink-400 dark:text-ink-500">Try:</span>
          {topicChips.map((c) => (
            <button
              key={c}
              onClick={() => run(c)}
              className="rounded-full border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 px-3 py-1.5 text-xs font-medium text-ink-600 dark:text-ink-300 hover:border-accent-300 hover:bg-accent-50 dark:hover:bg-accent-900/40 hover:text-accent-700 dark:hover:text-accent-300 transition-colors"
            >
              {c}
            </button>
          ))}
        </div>

        {error && <ErrorBanner className="mt-4" message={error} onRetry={() => run(topic)} onDismiss={() => setError(null)} />}
      </Card>

      {/* Loading */}
      {phase === 'loading' && (
        <Card className="mt-6">
          <LoadingPanel label={`Generating 10 questions on "${topic}"`} />
        </Card>
      )}

      {/* Quiz runner */}
      {phase === 'ready' && quiz && (
        <QuizRunner
          quiz={quiz}
          answers={answers}
          setAnswers={setAnswers}
          current={current}
          setCurrent={setCurrent}
          onFinish={() => setPhase('finished')}
        />
      )}

      {/* Results */}
      {phase === 'finished' && quiz && (
        <QuizResults quiz={quiz} answers={answers} score={score} onRetake={reset} onNewTopic={() => reset()} />
      )}

      {/* Idle hint */}
      {phase === 'idle' && !error && (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { icon: ListChecks, t: '10 questions', d: 'A full set of multiple-choice questions per topic.' },
            { icon: Lightbulb, t: 'Instant explanations', d: 'See why an answer is right the moment you pick it.' },
            { icon: Trophy, t: 'Track your score', d: 'Get a final score and a breakdown of what to review.' },
          ].map((f) => {
            const Icon = f.icon;
            return (
              <Card key={f.t} className="p-5">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 dark:bg-accent-900/40 text-accent-600 dark:text-accent-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-semibold text-ink-900 dark:text-ink-50">{f.t}</h3>
                <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{f.d}</p>
              </Card>
            );
          })}
        </div>
      )}
    </ToolPage>
  );
}

function QuizRunner({
  quiz,
  answers,
  setAnswers,
  current,
  setCurrent,
  onFinish,
}: {
  quiz: QuizResult;
  answers: Record<string, number>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  onFinish: () => void;
}) {
  const q = quiz.questions[current];
  const picked = answers[q.id];
  const isLast = current === quiz.questions.length - 1;

  const pick = (i: number) => {
    if (picked !== undefined) return;
    setAnswers((prev) => ({ ...prev, [q.id]: i }));
  };

  return (
    <div className="mt-6">
      <div className="mb-4 flex items-center justify-between">
        <Badge variant="accent">
          Question {current + 1} of {quiz.questions.length}
        </Badge>
        <span className="text-xs text-ink-400 dark:text-ink-500">{Object.keys(answers).length} answered</span>
      </div>
      <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-ink-100 dark:bg-ink-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent-500 to-ink-500 transition-all duration-500"
          style={{ width: `${((current + (picked !== undefined ? 1 : 0)) / quiz.questions.length) * 100}%` }}
        />
      </div>

      <Card className="p-6 sm:p-8">
        <div className="text-xs font-bold uppercase tracking-wider text-accent-600 dark:text-accent-400">
          {quiz.topic}
        </div>
        <h3 className="mt-2 font-display text-xl font-bold text-ink-900 dark:text-ink-50 leading-snug">
          {q.prompt}
        </h3>

        <div className="mt-6 grid gap-3">
          {q.options.map((opt, i) => {
            const isPicked = picked === i;
            const showResult = picked !== undefined;
            const isCorrect = i === q.answerIndex;
            return (
              <button
                key={i}
                onClick={() => pick(i)}
                disabled={showResult}
                className={`flex items-center justify-between rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-all ${
                  showResult && isCorrect
                    ? 'border-success-500 bg-success-50 dark:bg-success-900/30 text-success-700 dark:text-success-400'
                    : showResult && isPicked && !isCorrect
                    ? 'border-danger-500 bg-danger-50 dark:bg-danger-900/30 text-danger-600 dark:text-danger-400'
                    : 'border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-200 hover:border-accent-300 hover:bg-accent-50 dark:hover:bg-accent-900/40'
                } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg border text-xs font-bold ${
                      showResult && isCorrect
                        ? 'border-success-500 bg-success-500 text-white'
                        : showResult && isPicked && !isCorrect
                        ? 'border-danger-500 bg-danger-500 text-white'
                        : 'border-ink-200 dark:border-ink-700 text-ink-500 dark:text-ink-400'
                    }`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </span>
                {showResult && isCorrect && <Check className="h-5 w-5" />}
                {showResult && isPicked && !isCorrect && <X className="h-5 w-5" />}
              </button>
            );
          })}
        </div>

        {picked !== undefined && (
          <div className="mt-5 animate-fade-up rounded-xl bg-accent-50 dark:bg-accent-900/30 p-4">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent-700 dark:text-accent-300">
              <Lightbulb className="h-3.5 w-3.5" />
              {picked === q.answerIndex ? 'Correct' : 'Not quite'}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink-700 dark:text-ink-200">{q.explanation}</p>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0}>
            Previous
          </Button>
          {isLast ? (
            <Button size="sm" onClick={onFinish} disabled={picked === undefined} rightIcon={<ChevronRight className="h-4 w-4" />}>
              See results
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={() => setCurrent((c) => Math.min(quiz.questions.length - 1, c + 1))}
              disabled={picked === undefined}
              rightIcon={<ChevronRight className="h-4 w-4" />}
            >
              Next
            </Button>
          )}
        </div>
      </Card>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        {quiz.questions.map((qq, i) => {
          const answered = answers[qq.id] !== undefined;
          const correct = answered && answers[qq.id] === qq.answerIndex;
          return (
            <button
              key={qq.id}
              onClick={() => setCurrent(i)}
              className={`grid h-8 w-8 place-items-center rounded-lg text-xs font-bold transition-all ${
                i === current ? 'ring-2 ring-accent-400 ring-offset-1 dark:ring-offset-ink-950' : ''
              } ${
                answered
                  ? correct
                    ? 'bg-success-500 text-white'
                    : 'bg-danger-500 text-white'
                  : 'bg-ink-100 dark:bg-ink-800 text-ink-500 dark:text-ink-400 hover:bg-ink-200 dark:hover:bg-ink-700'
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function QuizResults({
  quiz,
  answers,
  score,
  onRetake,
  onNewTopic,
}: {
  quiz: QuizResult;
  answers: Record<string, number>;
  score: number;
  onRetake: () => void;
  onNewTopic: () => void;
}) {
  const total = quiz.questions.length;
  const pct = total ? Math.round((score / total) * 100) : 0;
  const pass = pct >= 60;

  return (
    <div className="mt-6">
      <Card className="overflow-hidden">
        <div className={`px-6 py-8 text-center text-white ${pass ? 'bg-gradient-to-br from-success-500 to-accent-600' : 'bg-gradient-to-br from-warning-500 to-accent-700'}`}>
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white/20 backdrop-blur">
            <Trophy className="h-8 w-8" />
          </div>
          <div className="mt-4 font-display text-4xl font-extrabold">
            {score} / {total}
          </div>
          <div className="mt-1 text-sm text-white/90">
            {pct}% · {pass ? 'Nice work — you are exam-ready on this.' : 'Good effort — review the misses below.'}
          </div>
        </div>

        <div className="p-6 space-y-4">
          <h3 className="font-display text-lg font-bold text-ink-900 dark:text-ink-50">Review</h3>
          {quiz.questions.map((q, i) => {
            const picked = answers[q.id];
            const correct = picked === q.answerIndex;
            return (
              <div key={q.id} className="rounded-xl border border-ink-100 dark:border-ink-800 p-4">
                <div className="flex items-start gap-3">
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-bold ${
                      correct ? 'bg-success-500 text-white' : 'bg-danger-500 text-white'
                    }`}
                  >
                    {correct ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                  </span>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-ink-900 dark:text-ink-50">
                      {i + 1}. {q.prompt}
                    </div>
                    <div className="mt-1.5 text-sm text-ink-600 dark:text-ink-300">
                      <span className="font-medium text-ink-500 dark:text-ink-400">Your answer: </span>
                      {picked !== undefined ? q.options[picked] : '— skipped —'}
                    </div>
                    {!correct && (
                      <div className="mt-1 text-sm text-success-700 dark:text-success-400">
                        <span className="font-medium">Correct: </span>
                        {q.options[q.answerIndex]}
                      </div>
                    )}
                    <p className="mt-2 rounded-lg bg-ink-50 dark:bg-ink-800 px-3 py-2 text-xs leading-relaxed text-ink-600 dark:text-ink-300">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <Button variant="outline" leftIcon={<RotateCcw className="h-4 w-4" />} onClick={onRetake}>
              Retake quiz
            </Button>
            <Button variant="ghost" onClick={onNewTopic}>
              New topic
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
