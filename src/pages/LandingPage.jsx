import { LandingNav } from '../components/landing/LandingNav';
import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import { HowItWorks } from '../components/landing/HowItWorks';
import { AiShowcase } from '../components/landing/AiShowcase';
import { EmotionGardenShowcase } from '../components/landing/EmotionGardenShowcase';
import { CTA } from '../components/landing/CTA';
import { Footer } from '../components/landing/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-earth-50 dark:bg-ink-900">
      <LandingNav />
      <Hero />
      <Features />
      <HowItWorks />
      <AiShowcase />
      <EmotionGardenShowcase />
      <CTA />
      <Footer />
    </div>
  );
}
