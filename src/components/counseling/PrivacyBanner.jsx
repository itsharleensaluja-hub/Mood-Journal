import { motion } from 'framer-motion';

export function PrivacyBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl border border-herb-300/40 dark:border-herb-600/30 bg-herb-50/80 dark:bg-herb-900/20 backdrop-blur-sm"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-3 px-4 py-3">
        <span className="text-herb-500 dark:text-herb-400 text-lg flex-shrink-0 mt-0.5" aria-hidden="true">🛡</span>
        <p className="handwriting text-sm text-herb-700 dark:text-herb-300 leading-relaxed">
          Your identity is hidden. Counselors cannot see your personal information unless you choose to share it.
        </p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-herb-400/5 via-transparent to-herb-400/5 pointer-events-none" />
    </motion.div>
  );
}
