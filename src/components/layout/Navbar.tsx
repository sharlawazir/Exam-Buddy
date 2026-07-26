import { useEffect, useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { NAV_ITEMS, type RouteId } from '@/config/nav';
import { useRouter } from '@/router/Router';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export function Navbar() {
  const { route, navigate } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (to: RouteId) => {
    setOpen(false);
    navigate(to);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-ink-950/80 backdrop-blur-xl border-b border-ink-100 dark:border-ink-800 shadow-soft'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <button
          onClick={() => go('home')}
          className="flex items-center gap-2.5 group"
          aria-label="Exam Buddy AI home"
        >
          <Logo className="h-9 w-9" />
          <span className="font-display text-lg font-bold text-ink-900 dark:text-ink-50 tracking-tight">
            Exam Buddy<span className="text-accent-600 dark:text-accent-400"> AI</span>
          </span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active = route === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => go(item.id)}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'text-accent-700 dark:text-accent-300'
                      : 'text-ink-600 dark:text-ink-300 hover:text-ink-900 dark:hover:text-ink-50 hover:bg-ink-100/70 dark:hover:bg-ink-800/70'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-accent-500 to-ink-500" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm" onClick={() => go('assistant')}>
            Sign in
          </Button>
          <Button size="sm" onClick={() => go('assistant')} leftIcon={<Sparkles className="h-4 w-4" />}>
            Try free
          </Button>
        </div>

        {/* Mobile actions */}
        <div className="lg:hidden flex items-center gap-1.5">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center h-10 w-10 rounded-lg text-ink-800 dark:text-ink-100 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
          open ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container-page pb-6 pt-2">
          <div className="rounded-2xl bg-white dark:bg-ink-900 border border-ink-100 dark:border-ink-800 shadow-card p-3">
            <ul className="grid gap-1">
              {NAV_ITEMS.map((item) => {
                const active = route === item.id;
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => go(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors ${
                        active ? 'bg-accent-50 dark:bg-accent-900/40 text-accent-700 dark:text-accent-300' : 'text-ink-700 dark:text-ink-200 hover:bg-ink-100 dark:hover:bg-ink-800'
                      }`}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <span className="flex-1">
                        <span className="block text-sm font-semibold">{item.label}</span>
                        <span className="block text-xs text-ink-400 dark:text-ink-500">{item.tagline}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" onClick={() => go('assistant')}>
                Sign in
              </Button>
              <Button size="sm" onClick={() => go('assistant')} leftIcon={<Sparkles className="h-4 w-4" />}>
                Try free
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
