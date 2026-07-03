import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useCallback } from 'react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { AppLogo } from '../ui/AppLogo';

const links = [
  { label: 'Features', href: 'features' },
  { label: 'Preview', href: 'preview' },
  { label: 'Garden', href: 'garden' },
  { label: 'How it works', href: 'how-it-works' },
];

export function LandingNav() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 80);
  });

  const scrollTo = useCallback((id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [navigate]);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-6 transition-all duration-300 ${
        scrolled ? 'bg-paper-100/80 dark:bg-ink-900/80 backdrop-blur-2xl border-b border-earth-300 dark:border-ink-700' : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Landing navigation"
    >
      <div className="flex items-center justify-between w-full max-w-5xl mx-auto">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 group"
          aria-label="MindPulse Home"
        >
          <AppLogo size="sm" variant="symbol" className="text-ink-800 dark:text-ink-100 group-hover:opacity-80 transition-opacity" />
          <span className="handwriting text-lg text-ink-800 dark:text-ink-100">
            MindPulse
          </span>
        </button>

        <div className="hidden md:flex items-center gap-7">
          {links.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="relative group typewriter text-[11px] uppercase tracking-wider text-ink-400 hover:text-ink-700 dark:text-ink-500 dark:hover:text-ink-300 transition-colors duration-150 py-1 focus-ring"
            >
              {item.label}
              <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brass-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </button>
          ))}
          <ThemeToggle />
          <button
            onClick={() => navigate('/dashboard')}
            className="handwriting text-base px-5 py-1.5 bg-brass-400/20 hover:bg-brass-400/30 text-ink-700 dark:text-ink-200 rounded-lg transition-all duration-150 active:scale-[0.97] border border-brass-400/30 focus-ring"
          >
            Open the journal
          </button>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            className="p-2 text-ink-600 dark:text-ink-400 focus-ring rounded-md"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(v => !v)}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="absolute top-14 left-0 right-0 bg-paper-100/90 dark:bg-ink-900/90 backdrop-blur-2xl border-b border-earth-300 dark:border-ink-700 md:hidden"
        >
          <div className="flex flex-col px-6 py-5 gap-4">
            {links.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="typewriter text-xs uppercase tracking-wider text-ink-600 dark:text-ink-400 hover:text-ink-900 dark:hover:text-ink-200 transition-colors text-left py-1 focus-ring"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { setMobileOpen(false); navigate('/dashboard'); }}
              className="w-full handwriting text-lg px-4 py-2.5 bg-brass-400/20 hover:bg-brass-400/30 text-ink-800 dark:text-ink-200 rounded-lg transition-colors duration-150 text-center border border-brass-400/30 focus-ring"
            >
              Open the journal
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
