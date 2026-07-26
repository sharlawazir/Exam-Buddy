import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

type Tool =
  | "assistant"
  | "quiz"
  | "notes"
  | "planner"
  | "motivation";

interface AssistantBody {
  tool: "assistant";
  history: { role: "user" | "assistant"; content: string }[];
  message: string;
}
interface QuizBody {
  tool: "quiz";
  topic: string;
}
interface NotesBody {
  tool: "notes";
  text: string;
}
interface PlannerBody {
  tool: "planner";
  studentName?: string;
  subject: string;
  topics: string;
  examDate: string;
  studyDays: number;
  hoursPerDay: number;
  preferredTime: string;
  difficulty: "Easy" | "Medium" | "Hard";
}
interface MotivationBody {
  tool: "motivation";
  context?: string;
}

const SYSTEM_PROMPT = `You are Exam Buddy AI, a friendly, expert university tutor. You explain academic concepts clearly and in a beginner-friendly way. You are encouraging, precise, and never condescending.`;

const ASSISTANT_PROMPT = `You are an academic tutor. Answer the student's question with the following clearly labelled sections, each as a markdown heading (##). Keep every section beginner-friendly and concrete.

## Definition
A precise one or two sentence definition.

## Easy Explanation
Explain it as if to a curious beginner, in plain language with an everyday analogy.

## Key Concepts
A short bulleted list of the most important ideas or terms.

## Step-by-step Explanation
A numbered breakdown of how the concept works or how to approach it.

## Worked Example
One fully worked example with the reasoning shown.

## Common Mistakes
A bulleted list of mistakes students make and how to avoid them.

## Practice Quiz
Five multiple-choice questions. For each, write the question, four labelled options (A, B, C, D), and the correct letter on its own line as "Answer: X". Keep them short.

## Summary
A two or three sentence recap of the most important takeaway.`;

const QUIZ_PROMPT = (topic: string) =>
  `You are an exam writer. Generate exactly 10 multiple-choice questions about "${topic}" for a university student. Return ONLY a JSON array, no markdown, no commentary. Each element must be: {"prompt": string, "options": [string, string, string, string], "answerIndex": number, "explanation": string}. The options must be exactly four strings. answerIndex is the zero-based index of the correct option. The explanation is one short sentence. Mix difficulty levels. Make sure distractors are plausible but clearly wrong.`;

const NOTES_PROMPT = `You are a study assistant. Read the student's notes and return ONLY a JSON object, no markdown, no commentary, with this exact shape:
{
  "overview": string,
  "keyPoints": [string],
  "keywords": [string],
  "examTips": [string],
  "vivaQuestions": [string],
  "quickRevisionNotes": [string]
}
- overview: 2-3 sentence summary of the whole passage.
- keyPoints: 4-6 bullet strings of the most important points.
- keywords: 6-10 important terms as single words or short phrases.
- examTips: 4-5 practical tips for revising this material for an exam.
- vivaQuestions: 5 likely oral/viva questions about this material.
- quickRevisionNotes: 4-6 ultra-short bullet strings useful for last-minute revision.`;

const PLANNER_PROMPT = (b: PlannerBody) =>
  `You are a study planner. Build a personalized day-by-day study schedule. Return ONLY a JSON object, no markdown, no commentary, with this exact shape:
{
  "studentName": string,
  "subject": string,
  "examDate": string,
  "summary": string,
  "days": [{ "day": number, "date": string, "focus": string, "topics": [string], "duration": string, "type": string }]
}
Inputs:
- Student name: ${b.studentName || "Student"}
- Subject: ${b.subject}
- Topics to study: ${b.topics}
- Exam date: ${b.examDate}
- Available study days: ${b.studyDays}
- Hours available per day: ${b.hoursPerDay}
- Preferred study time: ${b.preferredTime}
- Difficulty: ${b.difficulty}

Rules:
- Generate exactly ${b.studyDays} day entries, numbered 1 to ${b.studyDays}, leading up to the exam date.
- Distribute the topics across the early days, then include revision days, a practice quiz day, and a final revision day before the exam.
- "type" is one of: "Study", "Revision", "Practice Quiz", "Final Revision".
- "date" should be a readable date (e.g. "Mon, Aug 4").
- "duration" reflects the hours per day and preferred time (e.g. "2 hrs · Evening").
- "summary" is a 2-3 sentence overview of the plan.`;

const MOTIVATION_PROMPT = `You are a motivational coach for university students preparing for exams. Return ONLY a JSON object, no markdown, no commentary, with this exact shape:
{
  "title": string,
  "message": string,
  "tone": "calm" | "energetic" | "reflective" | "bold"
}
- title: a short punchy headline (3-6 words).
- message: one or two sentences of genuine, specific encouragement about studying and exams. Avoid clichés.
- tone: pick the tone that best matches the message.`;

function systemForTool(tool: Tool): string {
  switch (tool) {
    case "assistant":
      return `${SYSTEM_PROMPT}\n\n${ASSISTANT_PROMPT}`;
    case "quiz":
      return `${SYSTEM_PROMPT}\n\nReturn only valid JSON.`;
    case "notes":
      return `${SYSTEM_PROMPT}\n\nReturn only valid JSON.`;
    case "planner":
      return `${SYSTEM_PROMPT}\n\nReturn only valid JSON.`;
    case "motivation":
      return `${SYSTEM_PROMPT}\n\nReturn only valid JSON.`;
  }
}

function userPromptForTool(body: AssistantBody | QuizBody | NotesBody | PlannerBody | MotivationBody): string {
  switch (body.tool) {
    case "assistant":
      return body.message;
    case "quiz":
      return QUIZ_PROMPT(body.topic);
    case "notes":
      return `${NOTES_PROMPT}\n\n--- NOTES START ---\n${body.text}\n--- NOTES END ---`;
    case "planner":
      return PLANNER_PROMPT(body);
    case "motivation":
      return `${MOTIVATION_PROMPT}\n\nContext: ${body.context || "A student preparing for exams."}`;
  }
}

interface GeminiContent {
  role: string;
  parts: { text: string }[];
}

function buildContents(body: AssistantBody | QuizBody | NotesBody | PlannerBody | MotivationBody): GeminiContent[] {
  const contents: GeminiContent[] = [];
  if (body.tool === "assistant") {
    for (const m of body.history.slice(-10)) {
      contents.push({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] });
    }
  }
  contents.push({ role: "user", parts: [{ text: userPromptForTool(body) }] });
  return contents;
}

function extractJson(text: string): unknown {
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
  }
  const start = cleaned.search(/[{[]/);
  if (start === -1) throw new Error("No JSON found in AI response.");
  const open = cleaned[start];
  const close = open === "{" ? "}" : "]";
  const end = cleaned.lastIndexOf(close);
  if (end === -1) throw new Error("Incomplete JSON in AI response.");
  const slice = cleaned.slice(start, end + 1);
  return JSON.parse(slice);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Gemini API key is not configured. Add GEMINI_API_KEY in Supabase Edge Function secrets." }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body = await req.json() as AssistantBody | QuizBody | NotesBody | PlannerBody | MotivationBody;
    if (!body || typeof body.tool !== "string") {
      return new Response(
        JSON.stringify({ error: "Invalid request: missing 'tool' field." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const contents = buildContents(body);
    const wantsJson = body.tool !== "assistant";
    const temperature = body.tool === "motivation" ? 0.9 : body.tool === "quiz" ? 0.7 : 0.5;
    const maxTokens = body.tool === "quiz" ? 4000 : body.tool === "planner" ? 3000 : body.tool === "assistant" ? 2400 : 2000;

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemForTool(body.tool) }] },
          contents,
          generationConfig: {
            temperature,
            maxOutputTokens: maxTokens,
            ...(wantsJson ? { responseMimeType: "application/json" } : {}),
          },
        }),
      },
    );

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      return new Response(
        JSON.stringify({ error: `Gemini request failed (${geminiRes.status}): ${errText.slice(0, 300)}` }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const geminiJson = await geminiRes.json();
    const content: string | undefined = geminiJson?.candidates?.[0]?.content?.parts
      ?.map((p: { text?: string }) => p.text ?? "")
      .join("") || undefined;

    if (!content) {
      const finishReason = geminiJson?.candidates?.[0]?.finishReason;
      return new Response(
        JSON.stringify({ error: `Gemini returned an empty response${finishReason ? ` (${finishReason})` : ""}.` }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    if (wantsJson) {
      try {
        const parsed = extractJson(content);
        return new Response(
          JSON.stringify({ data: parsed }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      } catch {
        return new Response(
          JSON.stringify({ error: "AI returned malformed JSON. Please try again.", raw: content.slice(0, 500) }),
          { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
    }

    return new Response(
      JSON.stringify({ data: { content } }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unexpected server error." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
