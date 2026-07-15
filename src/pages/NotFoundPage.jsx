import { Link } from 'react-router-dom';
import { HandwrittenText } from '../components/archive/HandwrittenText';
import { AppLogo } from '../components/ui/AppLogo';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen desk-surface flex items-center justify-center p-4">
      <div className="text-center max-w-sm">
        <div className="flex justify-center mb-6">
          <AppLogo variant="symbol" size="lg" />
        </div>
        <HandwrittenText as="h1" size="xl" className="text-ink-900 dark:text-ink-100 mb-2">
          Lost in the archive
        </HandwrittenText>
        <HandwrittenText size="sm" color="ink-500" className="mb-8">
          This page has been misplaced, misfiled, or never existed.
        </HandwrittenText>
        <Link
          to="/"
          className="inline-block handwriting text-lg px-5 py-2.5 bg-brass-400/20 hover:bg-brass-400/30 text-ink-700 dark:text-ink-300 rounded-lg transition-colors duration-150 border border-brass-400/30 focus-ring"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}
