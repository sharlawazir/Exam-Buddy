import { Sparkles, User } from 'lucide-react';
import type { ChatMessageData } from '@/services/ai';
import { CopyButton } from '@/components/ui/CopyButton';
import { Markdown } from '@/components/ui/Markdown';

export function ChatMessage({ message }: { message: ChatMessageData }) {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end gap-3 animate-fade-up">
        <div className="max-w-[80%] rounded-2xl rounded-br-md bg-ink-900 dark:bg-ink-800 px-4 py-3 text-sm leading-relaxed text-white shadow-soft">
          {message.content}
        </div>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-ink-200 dark:bg-ink-700 text-ink-600 dark:text-ink-300">
          <User className="h-4 w-4" />
        </span>
      </div>
    );
  }

  return (
    <div className="flex justify-start gap-3 animate-fade-up">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-accent-500 to-ink-600 text-white">
        <Sparkles className="h-4 w-4" />
      </span>
      <div className="group max-w-[88%]">
        <div className="rounded-2xl rounded-bl-md bg-white dark:bg-ink-900 border border-ink-100 dark:border-ink-800 px-4 py-3 shadow-soft">
          <Markdown text={message.content} />
        </div>
        <div className="mt-1.5 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <CopyButton text={message.content} />
        </div>
      </div>
    </div>
  );
}
