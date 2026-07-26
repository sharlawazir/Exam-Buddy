/**
 * AI service — talks to the `ai` Supabase Edge Function, which proxies
 * OpenAI with the API key held as a server-side secret. The frontend never
 * sees or sends the key. All five tools share one endpoint, routed by `tool`.
 */

export interface ChatMessageData {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: number;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface QuizResult {
  topic: string;
  questions: QuizQuestion[];
}

export interface NotesSummary {
  overview: string;
  keyPoints: string[];
  keywords: string[];
  examTips: string[];
  vivaQuestions: string[];
  quickRevisionNotes: string[];
}

export interface PlannerDay {
  day: number;
  date: string;
  focus: string;
  topics: string[];
  duration: string;
  type: string;
}

export interface PlannerResult {
  studentName: string;
  subject: string;
  examDate: string;
  summary: string;
  days: PlannerDay[];
}

export interface MotivationCard {
  id: string;
  title: string;
  message: string;
  tone: 'calm' | 'energetic' | 'reflective' | 'bold';
}

const uid = () => Math.random().toString(36).slice(2, 10);

const FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai`;
const HEADERS = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
};

async function callAI<T>(body: Record<string, unknown>): Promise<T> {
  let res: Response;
  try {
    res = await fetch(FUNCTION_URL, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error('Could not reach the AI service. Check your connection and try again.');
  }

  let payload: { data?: T; error?: string; raw?: string };
  try {
    payload = await res.json();
  } catch {
    throw new Error('The AI service returned an unreadable response. Please try again.');
  }

  if (!res.ok) {
    const msg = payload.error || `Request failed (${res.status}).`;
    throw new Error(msg);
  }

  if (payload.data === undefined) {
    throw new Error(payload.error || 'The AI service returned an unexpected response.');
  }

  return payload.data;
}

/* ------------------------------------------------------------------ */
/* AI Assistant                                                        */
/* ------------------------------------------------------------------ */

export async function sendChatMessage(
  history: ChatMessageData[],
  userText: string,
): Promise<ChatMessageData> {
  const data = await callAI<{ content: string }>({
    tool: 'assistant',
    history: history.map((m) => ({ role: m.role, content: m.content })),
    message: userText,
  });
  return {
    id: uid(),
    role: 'assistant',
    content: data.content,
    createdAt: Date.now(),
  };
}

/* ------------------------------------------------------------------ */
/* Quiz Generator                                                      */
/* ------------------------------------------------------------------ */

export async function generateQuiz(topic: string): Promise<QuizResult> {
  const data = await callAI<{ questions?: QuizQuestion[]; prompt?: string } | QuizQuestion[]>({
    tool: 'quiz',
    topic,
  });

  // The model may return either { questions: [...] } or a bare array.
  const raw = Array.isArray(data) ? data : data.questions;
  if (!Array.isArray(raw) || raw.length === 0) {
    throw new Error('The AI did not return any questions. Try rephrasing your topic.');
  }

  const questions: QuizQuestion[] = raw.map((q, i) => ({
    id: uid(),
    prompt: q.prompt ?? `Question ${i + 1}`,
    options: Array.isArray(q.options) ? q.options.slice(0, 4) : [],
    answerIndex: typeof q.answerIndex === 'number' ? q.answerIndex : 0,
    explanation: q.explanation ?? '',
  }));

  return { topic: topic.trim() || 'General study skills', questions };
}

/* ------------------------------------------------------------------ */
/* Notes Summarizer                                                    */
/* ------------------------------------------------------------------ */

export async function summarizeNotes(text: string): Promise<NotesSummary> {
  const data = await callAI<Partial<NotesSummary>>({ tool: 'notes', text });
  return {
    overview: data.overview ?? 'No overview was generated.',
    keyPoints: Array.isArray(data.keyPoints) ? data.keyPoints : [],
    keywords: Array.isArray(data.keywords) ? data.keywords : [],
    examTips: Array.isArray(data.examTips) ? data.examTips : [],
    vivaQuestions: Array.isArray(data.vivaQuestions) ? data.vivaQuestions : [],
    quickRevisionNotes: Array.isArray(data.quickRevisionNotes) ? data.quickRevisionNotes : [],
  };
}

/* ------------------------------------------------------------------ */
/* Study Planner                                                       */
/* ------------------------------------------------------------------ */

export interface PlannerInput {
  studentName?: string;
  subject: string;
  topics: string;
  examDate: string;
  studyDays: number;
  hoursPerDay: number;
  preferredTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export async function generatePlan(input: PlannerInput): Promise<PlannerResult> {
  const data = await callAI<Partial<PlannerResult>>({ tool: 'planner', ...input });
  return {
    studentName: data.studentName || input.studentName || 'Student',
    subject: data.subject || input.subject,
    examDate: data.examDate || input.examDate,
    summary: data.summary ?? '',
    days: Array.isArray(data.days) ? data.days : [],
  };
}

/* ------------------------------------------------------------------ */
/* Motivation                                                          */
/* ------------------------------------------------------------------ */

export async function getMotivation(context?: string): Promise<MotivationCard> {
  const data = await callAI<Partial<MotivationCard>>({ tool: 'motivation', context });
  return {
    id: uid(),
    title: data.title || 'Keep going',
    message: data.message || 'You have got this.',
    tone: data.tone === 'calm' || data.tone === 'energetic' || data.tone === 'reflective' || data.tone === 'bold'
      ? data.tone
      : 'calm',
  };
}
