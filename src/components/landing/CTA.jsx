import { useNavigate } from 'react-router-dom';
import { HandwrittenText } from '../archive/HandwrittenText';

export function CTA() {
  const navigate = useNavigate();

  return (
    <section className="py-36 sm:py-48 px-6 bg-earth-200/50 dark:bg-ink-800/10 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-radial from-brass-400/3 to-transparent rounded-full pointer-events-none" />
      <div className="max-w-lg mx-auto text-center relative">
        <div className="mb-6">
          <span className="text-4xl block mb-4">◈</span>
          <HandwrittenText as="div" size="xl" className="text-ink-800 dark:text-ink-100 mb-2">
            Your journal is waiting
          </HandwrittenText>
          <HandwrittenText size="sm" color="ink-500" className="block">
            A quiet desk, an open notebook, a growing terrarium. Begin your Living Archive.
          </HandwrittenText>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="handwriting text-lg px-10 py-3.5 bg-ink-800 hover:bg-ink-900 dark:bg-ink-100 dark:hover:bg-ink-200 text-paper-100 dark:text-ink-900 rounded-lg transition-all duration-150 active:scale-[0.97] shadow-md hover:shadow-lg tracking-[-0.01em] focus-ring"
        >
          Open the journal
        </button>
        <div className="mt-6 flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brass-400/50" />
          <HandwrittenText size="xs" color="ink-400">
            Your data stays on your device. No servers, no tracking.
          </HandwrittenText>
          <span className="w-2 h-2 rounded-full bg-brass-400/50" />
        </div>
      </div>
    </section>
  );
}
