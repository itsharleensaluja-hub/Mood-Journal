import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import { HowItWorks } from '../components/landing/HowItWorks';
import { Testimonials } from '../components/landing/Testimonials';
import { CTA } from '../components/landing/CTA';
import { Footer } from '../components/landing/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-earth-50 dark:bg-ink-900">
      <nav className="fixed top-0 left-0 right-0 z-50 h-14 nav-glass hidden md:flex items-center px-6">
        <div className="flex items-center justify-between w-full max-w-6xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-plum-500 text-lg">✦</span>
            <span className="text-base font-serif font-semibold text-ink-800 dark:text-ink-100">
              MindPulse
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm text-ink-400 hover:text-ink-700 dark:text-ink-500 dark:hover:text-ink-300 transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-ink-400 hover:text-ink-700 dark:text-ink-500 dark:hover:text-ink-300 transition-colors">How It Works</a>
            <a href="#testimonials" className="text-sm text-ink-400 hover:text-ink-700 dark:text-ink-500 dark:hover:text-ink-300 transition-colors">Testimonials</a>
          </div>
        </div>
      </nav>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
