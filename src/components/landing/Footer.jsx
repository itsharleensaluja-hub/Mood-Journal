import { AppLogo } from '../ui/AppLogo';
import { HandwrittenText } from '../archive/HandwrittenText';

export function Footer() {
  return (
    <footer className="border-t border-earth-300 dark:border-ink-700">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-3">
            <AppLogo size="sm" variant="symbol" className="text-brass-400 shrink-0" />
            <div>
              <HandwrittenText size="base" className="text-ink-800 dark:text-ink-100">
                MindPulse
              </HandwrittenText>
              <HandwrittenText size="xs" color="ink-400">Est. 2026</HandwrittenText>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs text-ink-400 dark:text-ink-500">
            <a href="#features" className="typewriter uppercase tracking-wider hover:text-ink-700 dark:hover:text-ink-300 transition-colors focus-ring rounded-sm">
              Features
            </a>
            <a href="#preview" className="typewriter uppercase tracking-wider hover:text-ink-700 dark:hover:text-ink-300 transition-colors focus-ring rounded-sm">
              Preview
            </a>
            <a href="#garden" className="typewriter uppercase tracking-wider hover:text-ink-700 dark:hover:text-ink-300 transition-colors focus-ring rounded-sm">
              Garden
            </a>
            <a href="#how-it-works" className="typewriter uppercase tracking-wider hover:text-ink-700 dark:hover:text-ink-300 transition-colors focus-ring rounded-sm">
              Method
            </a>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-earth-200/60 dark:border-ink-700/60">
          <HandwrittenText size="xs" color="ink-400">
            &copy; {new Date().getFullYear()} MindPulse. Your Living Archive.
          </HandwrittenText>
          <div className="flex items-center gap-6">
            <a href="#/" className="typewriter text-[10px] uppercase tracking-wider text-ink-400 hover:text-ink-700 dark:text-ink-500 dark:hover:text-ink-300 transition-colors focus-ring rounded-sm">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
