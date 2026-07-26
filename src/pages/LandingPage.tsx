import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Testimonials } from '@/components/landing/Testimonials';
import { About } from '@/components/landing/About';
import { CTA } from '@/components/landing/CTA';

export function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <About />
      <CTA />
    </>
  );
}
