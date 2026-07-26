import {
  Sparkles,
  ListChecks,
  FileText,
  CalendarRange,
  Flame,
  Info,
  Home,
  type LucideIcon,
} from 'lucide-react';

export type RouteId =
  | 'home'
  | 'assistant'
  | 'quiz'
  | 'notes'
  | 'planner'
  | 'motivation'
  | 'about';

export interface NavItem {
  id: RouteId;
  label: string;
  short: string;
  href: string;
  icon: LucideIcon;
  tagline: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', short: 'Home', href: '/', icon: Home, tagline: 'Overview' },
  { id: 'assistant', label: 'AI Assistant', short: 'AI', href: '/assistant', icon: Sparkles, tagline: 'Ask anything' },
  { id: 'quiz', label: 'Quiz Generator', short: 'Quiz', href: '/quiz', icon: ListChecks, tagline: 'Test yourself' },
  { id: 'notes', label: 'Notes Summarizer', short: 'Notes', href: '/notes', icon: FileText, tagline: 'Condense fast' },
  { id: 'planner', label: 'Study Planner', short: 'Planner', href: '/planner', icon: CalendarRange, tagline: 'Plan your week' },
  { id: 'motivation', label: 'Motivation', short: 'Motivation', href: '/motivation', icon: Flame, tagline: 'Stay on track' },
  { id: 'about', label: 'About', short: 'About', href: '/about', icon: Info, tagline: 'Our story' },
];

export const ROUTES: Record<RouteId, NavItem> = NAV_ITEMS.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {} as Record<RouteId, NavItem>);
