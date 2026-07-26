import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { NAV_ITEMS, type RouteId } from '@/config/nav';

interface RouterContextValue {
  route: RouteId;
  path: string;
  navigate: (to: RouteId) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

function pathToRoute(path: string): RouteId {
  const clean = path.replace(/\/+$/, '') || '/';
  const match = NAV_ITEMS.find((item) => item.href === clean);
  return match ? match.id : 'home';
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState<string>(() => window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to: RouteId) => {
    const item = NAV_ITEMS.find((n) => n.id === to);
    if (!item) return;
    if (window.location.pathname !== item.href) {
      window.history.pushState({}, '', item.href);
      setPath(item.href);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const route = pathToRoute(path);

  return (
    <RouterContext.Provider value={{ route, path, navigate }}>{children}</RouterContext.Provider>
  );
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
}
