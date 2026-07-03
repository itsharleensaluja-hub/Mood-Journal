import { useNavigate } from 'react-router-dom';

export function CTA() {
  const navigate = useNavigate();

  return (
    <section className="py-20 sm:py-28 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-ink-900 dark:text-ink-100 mb-4 leading-tight">
          Start your emotional journey today
        </h2>
        <p className="text-sm text-ink-400 dark:text-ink-500 max-w-md mx-auto mb-8 leading-relaxed">
          Join thousands of people who are transforming their relationship with their emotions. Start journaling for free — no account needed.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-7 py-3 bg-plum-500 hover:bg-plum-600 active:bg-plum-700 text-white rounded-lg text-sm font-medium transition-all duration-150 active:scale-[0.97]"
        >
          Get started free
        </button>
        <p className="text-xs text-ink-400 dark:text-ink-600 mt-4">
          Your data stays on your device. No servers, no tracking.
        </p>
      </div>
    </section>
  );
}
