import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Sparkles,
  Send,
  Plus,
  Trash2,
  MessageSquare,
  ListChecks,
  FileText,
  BookOpen,
  Clock,
  Eraser,
} from 'lucide-react';
import { ToolPage, type ToolMeta } from '@/components/tools/ToolPage';
import { useRouter } from '@/router/Router';
import { useToast } from '@/components/ui/Toast';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { LoadingDots } from '@/components/ui/Loading';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { sendChatMessage, type ChatMessageData } from '@/services/ai';

const meta: ToolMeta = {
  icon: Sparkles,
  label: 'AI Assistant',
  title: 'AI Assistant',
  subtitle:
    'Ask anything about your courses and get a structured, beginner-friendly explanation — with a built-in practice quiz.',
  accent: 'from-accent-500 to-ink-600',
  badge: 'AI-powered',
};

interface Conversation {
  id: string;
  title: string;
  messages: ChatMessageData[];
  updatedAt: number;
}

const uid = () => Math.random().toString(36).slice(2, 10);

const starterPrompts = [
  { icon: ListChecks, label: 'Explain photosynthesis step by step' },
  { icon: FileText, label: 'What is the Keynesian multiplier?' },
  { icon: BookOpen, label: 'Explain recursion with an analogy' },
  { icon: Clock, label: 'How does a hash table work?' },
];

function newConversation(): Conversation {
  return { id: uid(), title: 'New chat', messages: [], updatedAt: Date.now() };
}

export function AssistantPage() {
  const { navigate } = useRouter();
  const toast = useToast();
  const [conversations, setConversations] = useState<Conversation[]>(() => [newConversation()]);
  const [activeId, setActiveId] = useState<string>(() => conversations[0].id);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const active = conversations.find((c) => c.id === activeId) ?? conversations[0];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [active.messages, loading]);

  const updateConversation = useCallback(
    (id: string, updater: (c: Conversation) => Conversation) => {
      setConversations((prev) => prev.map((c) => (c.id === id ? updater(c) : c)));
    },
    [],
  );

  const send = async (text?: string) => {
    const value = (text ?? input).trim();
    if (!value || loading) return;

    setError(null);
    const userMsg: ChatMessageData = {
      id: uid(),
      role: 'user',
      content: value,
      createdAt: Date.now(),
    };

    const convId = activeId;
    updateConversation(convId, (c) => ({
      ...c,
      title: c.messages.length === 0 ? value.slice(0, 42) : c.title,
      messages: [...c.messages, userMsg],
      updatedAt: Date.now(),
    }));
    setInput('');
    setLoading(true);

    try {
      const reply = await sendChatMessage(active.messages, value);
      updateConversation(convId, (c) => ({
        ...c,
        messages: [...c.messages, reply],
        updatedAt: Date.now(),
      }));
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Something went wrong. Please try again.';
      setError(msg);
      toast(msg, 'error');
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const startNew = () => {
    const conv = newConversation();
    setConversations((prev) => [conv, ...prev]);
    setActiveId(conv.id);
    setInput('');
    setError(null);
    toast('Started a new chat', 'info');
    inputRef.current?.focus();
  };

  const clearChat = () => {
    updateConversation(activeId, (c) => ({ ...c, messages: [], title: 'New chat' }));
    setError(null);
    toast('Chat cleared', 'info');
    inputRef.current?.focus();
  };

  const deleteConversation = (id: string) => {
    setConversations((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      if (filtered.length === 0) {
        const fresh = newConversation();
        setActiveId(fresh.id);
        return [fresh];
      }
      if (id === activeId) setActiveId(filtered[0].id);
      return filtered;
    });
    toast('Chat deleted', 'info');
  };

  return (
    <ToolPage meta={meta}>
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Sidebar — chat history */}
        <aside className="lg:col-span-1 order-2 lg:order-1">
          <div className="card-surface flex flex-col p-3 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)]">
            <Button className="w-full" leftIcon={<Plus className="h-4 w-4" />} onClick={startNew}>
              New chat
            </Button>

            <div className="mt-4 px-2 text-xs font-bold uppercase tracking-wider text-ink-400 dark:text-ink-500">
              Chat history
            </div>
            <div className="mt-2 flex-1 space-y-1 overflow-y-auto pr-1">
              {conversations.map((c) => {
                const isActive = c.id === activeId;
                return (
                  <div
                    key={c.id}
                    className={`group flex items-center gap-2 rounded-lg px-2.5 py-2 transition-colors ${
                      isActive ? 'bg-accent-50 dark:bg-accent-900/40' : 'hover:bg-ink-100 dark:hover:bg-ink-800'
                    }`}
                  >
                    <button
                      onClick={() => {
                        setActiveId(c.id);
                        setError(null);
                      }}
                      className="flex min-w-0 flex-1 items-center gap-2 text-left"
                    >
                      <MessageSquare
                        className={`h-4 w-4 shrink-0 ${isActive ? 'text-accent-600 dark:text-accent-400' : 'text-ink-400 dark:text-ink-500'}`}
                      />
                      <span
                        className={`truncate text-sm ${
                          isActive ? 'font-semibold text-accent-700 dark:text-accent-300' : 'text-ink-600 dark:text-ink-300'
                        }`}
                      >
                        {c.title}
                      </span>
                    </button>
                    <button
                      onClick={() => deleteConversation(c.id)}
                      className="shrink-0 rounded p-1 text-ink-300 opacity-0 transition-opacity hover:text-danger-500 group-hover:opacity-100"
                      aria-label="Delete chat"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 rounded-xl bg-accent-50 dark:bg-accent-900/30 p-3.5">
              <div className="text-xs font-semibold text-accent-700 dark:text-accent-300">Pro tip</div>
              <p className="mt-1 text-xs text-ink-500 dark:text-ink-400 leading-relaxed">
                Each answer includes a 5-question practice quiz — try answering it before moving on.
              </p>
            </div>
          </div>
        </aside>

        {/* Chat column */}
        <div className="lg:col-span-3 order-1 lg:order-2">
          <div className="card-surface flex h-[72vh] min-h-[540px] flex-col overflow-hidden">
            {/* header */}
            <div className="flex items-center justify-between border-b border-ink-100 dark:border-ink-800 px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent-500 to-ink-600 text-white">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-sm font-bold text-ink-900 dark:text-ink-50">{active.title}</div>
                  <div className="text-xs text-ink-400 dark:text-ink-500">Powered by Exam Buddy AI</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {active.messages.length > 0 && (
                  <button
                    onClick={clearChat}
                    className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-ink-500 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
                    title="Clear conversation"
                  >
                    <Eraser className="h-3.5 w-3.5" />
                    Clear
                  </button>
                )}
                <Badge variant="success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success-500" />
                  Online
                </Badge>
              </div>
            </div>

            {/* messages */}
            <div ref={scrollRef} className="flex-1 space-y-5 overflow-y-auto px-5 py-6">
              {active.messages.length === 0 && !loading && (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-accent-500 to-ink-600 text-white shadow-glow">
                    <Sparkles className="h-8 w-8" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-ink-900 dark:text-ink-50">
                    What should we study today?
                  </h3>
                  <p className="mt-2 max-w-md text-sm text-ink-500 dark:text-ink-400">
                    Ask any academic question. Your AI tutor responds with a definition, easy
                    explanation, key concepts, step-by-step breakdown, worked example, common
                    mistakes, a 5-question quiz, and a summary.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {starterPrompts.map((p) => {
                      const Icon = p.icon;
                      return (
                        <button
                          key={p.label}
                          onClick={() => send(p.label)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 px-3.5 py-2 text-xs font-medium text-ink-600 dark:text-ink-300 hover:border-accent-300 hover:bg-accent-50 dark:hover:bg-accent-900/40 hover:text-accent-700 dark:hover:text-accent-300 transition-colors"
                        >
                          <Icon className="h-3.5 w-3.5" />
                          {p.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {active.messages.map((m) => (
                <ChatMessage key={m.id} message={m} />
              ))}

              {loading && (
                <div className="flex justify-start gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-accent-500 to-ink-600 text-white">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <div className="rounded-2xl rounded-bl-md bg-white dark:bg-ink-900 border border-ink-100 dark:border-ink-800 px-4 py-3.5 shadow-soft">
                    <LoadingDots label="Thinking" />
                  </div>
                </div>
              )}

              {error && (
                <ErrorBanner
                  message={error}
                  onDismiss={() => setError(null)}
                  onRetry={() => send(input)}
                />
              )}
            </div>

            {/* input — fixed at bottom of the card */}
            <div className="border-t border-ink-100 dark:border-ink-800 p-3.5">
              <div className="flex items-end gap-2 rounded-2xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 px-3 py-2 focus-within:border-accent-400 focus-within:ring-2 focus-within:ring-accent-500/20 transition-all">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  rows={1}
                  placeholder="Ask anything about your course…"
                  className="max-h-32 flex-1 resize-none bg-transparent py-2 text-sm text-ink-900 dark:text-ink-100 placeholder:text-ink-400 focus:outline-none"
                />
                <button
                  onClick={() => send()}
                  disabled={!input.trim() || loading}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-accent-600 to-ink-600 text-white disabled:opacity-40 transition-all hover:shadow-glow"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between px-1 text-[11px] text-ink-400 dark:text-ink-500">
                <span>Press Enter to send · Shift+Enter for a new line</span>
                <button
                  onClick={() => navigate('quiz')}
                  className="inline-flex items-center gap-1 hover:text-accent-700 dark:hover:text-accent-300 transition-colors"
                >
                  <ListChecks className="h-3 w-3" />
                  Make it a quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolPage>
  );
}
