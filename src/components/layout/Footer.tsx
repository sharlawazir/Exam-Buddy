import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { NAV_ITEMS, type RouteId } from '@/config/nav';
import { useRouter } from '@/router/Router';
import { Logo } from '@/components/Logo';

const DEV_LINKS = {
  github: 'https://github.com/',
  linkedin: 'https://www.linkedin.com/',
  email: 'mailto:sharla.wazir@example.com',
};

export function Footer() {
  const { navigate } = useRouter();

  const link = (to: RouteId, label: string) => (
    <button
      onClick={() => navigate(to)}
      className="text-ink-500 dark:text-ink-400 hover:text-accent-700 dark:hover:text-accent-300 transition-colors text-left"
    >
      {label}
    </button>
  );

  return (
    <footer className="relative mt-24 border-t border-ink-100 dark:border-ink-800 bg-white dark:bg-ink-950">
      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <Logo className="h-9 w-9" />
              <span className="font-display text-lg font-bold text-ink-900 dark:text-ink-50">
                Exam Buddy<span className="text-accent-600 dark:text-accent-400"> AI</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-ink-500 dark:text-ink-400 leading-relaxed">
              Your AI-powered study companion. Turn lecture notes and textbooks into quizzes,
              summaries, and a study plan that actually fits your schedule.
            </p>

            <div className="mt-5 flex items-center gap-2">
              <a
                href={DEV_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-ink-100 dark:border-ink-800 text-ink-500 dark:text-ink-400 hover:text-accent-700 dark:hover:text-accent-300 hover:border-accent-300 dark:hover:border-accent-700 hover:bg-accent-50 dark:hover:bg-ink-800 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={DEV_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-ink-100 dark:border-ink-800 text-ink-500 dark:text-ink-400 hover:text-accent-700 dark:hover:text-accent-300 hover:border-accent-300 dark:hover:border-accent-700 hover:bg-accent-50 dark:hover:bg-ink-800 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={DEV_LINKS.email}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-ink-100 dark:border-ink-800 text-ink-500 dark:text-ink-400 hover:text-accent-700 dark:hover:text-accent-300 hover:border-accent-300 dark:hover:border-accent-700 hover:bg-accent-50 dark:hover:bg-ink-800 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-ink-900 dark:text-ink-50 mb-4">Product</h4>
            <ul className="space-y-3 text-sm">
              <li>{link('assistant', 'AI Assistant')}</li>
              <li>{link('quiz', 'Quiz Generator')}</li>
              <li>{link('notes', 'Notes Summarizer')}</li>
              <li>{link('planner', 'Study Planner')}</li>
              <li>{link('motivation', 'Motivation')}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-ink-900 dark:text-ink-50 mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>{link('about', 'About')}</li>
              <li>{link('home', 'Home')}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-ink-900 dark:text-ink-50 mb-4">Stay in the loop</h4>
            <p className="text-sm text-ink-500 dark:text-ink-400 mb-3">Product updates and study tips, monthly.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
              <input
                type="email"
                placeholder="you@uni.edu"
                className="min-w-0 flex-1 rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 px-3.5 py-2.5 text-sm text-ink-900 dark:text-ink-100 placeholder:text-ink-400 focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-500/20"
              />
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-ink-900 dark:bg-ink-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-ink-800 dark:hover:bg-ink-700 transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-ink-100 dark:border-ink-800">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-ink-500 dark:text-ink-400 flex items-center gap-1.5 flex-wrap">
              Built with
              <Heart className="h-3.5 w-3.5 text-danger-500 fill-current" />
              using React, TypeScript, Tailwind CSS and AI.
            </p>
            <div className="text-sm text-ink-500 dark:text-ink-400">
              <span className="font-semibold text-ink-700 dark:text-ink-300">Developer:</span>{' '}
              <span className="font-semibold text-ink-900 dark:text-ink-50">Sharla Wazir</span>
            </div>
          </div>
          <p className="mt-3 text-xs text-ink-400 dark:text-ink-500">
            © 2026 Sharla Wazir. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
