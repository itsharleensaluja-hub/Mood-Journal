import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { APP_NAME, APP_TAGLINE } from '../../data/constants';

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-plum-200/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-herb-200/15 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-plum-100 text-plum-700 dark:bg-plum-900/30 dark:text-plum-300 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-plum-500" />
            Your Emotional Intelligence Companion
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-ink-900 dark:text-ink-100 leading-[1.1] tracking-tight mb-6">
            Understand your
            <br />
            <span className="text-plum-500">emotional world</span>
          </h1>

          <p className="text-base sm:text-lg text-ink-400 dark:text-ink-500 max-w-xl mx-auto mb-10 leading-relaxed">
            Track your moods, journal your thoughts, and discover patterns with gentle AI-powered insights. Your personal space for emotional growth.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="px-7 py-3 bg-plum-500 hover:bg-plum-600 active:bg-plum-700 text-white rounded-lg text-sm font-medium transition-all duration-150 active:scale-[0.97]"
          >
            Start your journey
          </button>

          <button
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3 border border-ink-300 dark:border-ink-600 text-ink-700 dark:text-ink-300 rounded-lg text-sm font-medium hover:bg-earth-100 dark:hover:bg-ink-800 transition-all duration-150"
          >
            Explore features
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="flex items-center justify-center gap-8 sm:gap-12"
        >
          <div className="text-left">
            <div className="text-2xl font-bold text-ink-900 dark:text-ink-100">10K+</div>
            <div className="text-xs text-ink-400 dark:text-ink-500 mt-0.5">Active users</div>
          </div>
          <div className="w-px h-10 bg-ink-200 dark:bg-ink-700" />
          <div className="text-left">
            <div className="text-2xl font-bold text-ink-900 dark:text-ink-100">50K+</div>
            <div className="text-xs text-ink-400 dark:text-ink-500 mt-0.5">Journal entries</div>
          </div>
          <div className="w-px h-10 bg-ink-200 dark:bg-ink-700" />
          <div className="text-left">
            <div className="text-2xl font-bold text-ink-900 dark:text-ink-100">4.9★</div>
            <div className="text-xs text-ink-400 dark:text-ink-500 mt-0.5">User rating</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
