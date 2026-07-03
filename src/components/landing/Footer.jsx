import { APP_NAME } from '../../data/constants';

export function Footer() {
  return (
    <footer className="border-t border-earth-200 dark:border-ink-700">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-plum-500 text-base">✦</span>
            <span className="text-sm font-serif font-semibold text-ink-800 dark:text-ink-100">
              {APP_NAME}
            </span>
          </div>
          <div className="flex items-center gap-5 text-xs text-ink-400 dark:text-ink-500">
            <a href="#features" className="hover:text-ink-700 dark:hover:text-ink-300 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-ink-700 dark:hover:text-ink-300 transition-colors">How It Works</a>
            <a href="#testimonials" className="hover:text-ink-700 dark:hover:text-ink-300 transition-colors">Testimonials</a>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-earth-200 dark:border-ink-700 text-center text-xs text-ink-400 dark:text-ink-600">
          &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
