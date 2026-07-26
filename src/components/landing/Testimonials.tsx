import { Star, Quote } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { Card } from '@/components/ui/Card';

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  highlight: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Maya Chen',
    role: 'Biology, Year 2 · UCLA',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
    quote:
      "I went from cramming the night before to actually understanding the material. The quiz generator caught gaps I didn't even know I had.",
    highlight: 'Raised my bio grade from a C+ to an A−.',
  },
  {
    name: 'Daniel Okafor',
    role: 'Economics, Final year · LSE',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
    quote:
      'The study planner is the real MVP. It rebuilt my whole week around my dissertation deadline without making me feel guilty for taking breaks.',
    highlight: 'Finished my dissertation two days early.',
  },
  {
    name: 'Sofia Rossi',
    role: 'Law, Year 3 · Bologna',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
    quote:
      'Summarizing 40-page judgments into clean key points saved me hours every week. It feels like having a tutor on call.',
    highlight: 'Cut my reading time in half.',
  },
  {
    name: 'Aisha Rahman',
    role: 'Computer Science, Year 3 · Toronto',
    avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
    quote:
      "I asked it to explain a graph algorithm five different ways until it clicked. That's the moment I actually got it.",
    highlight: 'Finally cracked algorithms class.',
  },
  {
    name: 'Liam Walsh',
    role: 'History, Year 2 · Trinity College',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
    quote:
      'The motivation tool is surprisingly good. A quick check-in before a late session genuinely kept me going.',
    highlight: 'Studied 30% more consistently.',
  },
  {
    name: 'Yuki Tanaka',
    role: 'Pharmacy, Year 4 · Osaka',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
    quote:
      'Flashcards from my own notes, not someone else\'s generic deck. That made memorizing drug mechanisms so much faster.',
    highlight: 'Memorized 200+ mechanisms in a week.',
  },
];

export function Testimonials() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Loved by students"
            title={<>Students are studying differently this year</>}
            subtitle="Real results from real undergrads — across subjects, continents, and time zones."
          />
        </Reveal>

        <div className="mt-14 columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 80} className="break-inside-avoid mb-5">
              <Card hover className="p-6">
                <div className="flex items-center justify-between">
                  <Quote className="h-7 w-7 text-accent-200" />
                  <div className="flex items-center text-warning-500">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-700 dark:text-ink-200">"{t.quote}"</p>
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-accent-50 dark:bg-accent-900/40 px-3 py-1.5 text-xs font-semibold text-accent-700 dark:text-accent-300">
                  {t.highlight}
                </div>
                <div className="mt-5 flex items-center gap-3 pt-4 border-t border-ink-100 dark:border-ink-800">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-11 w-11 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <div className="text-sm font-bold text-ink-900 dark:text-ink-50">{t.name}</div>
                    <div className="text-xs text-ink-500 dark:text-ink-400">{t.role}</div>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
