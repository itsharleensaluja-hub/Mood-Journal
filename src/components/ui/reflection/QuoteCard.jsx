import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../../common/GlassCard';

export function QuoteCard({ quote }) {
  if (!quote) return null;

  return (
    <GlassCard padding="md" variant="accent" color="plum">
      <AnimatePresence mode="wait">
        <motion.div
          key={quote.text}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          <p className="text-sm font-serif italic text-ink-700 dark:text-ink-300 leading-relaxed mb-2">
            &ldquo;{quote.text}&rdquo;
          </p>
          <p className="text-xs text-ink-400 dark:text-ink-500">
            &mdash; {quote.author || 'Unknown'}
          </p>
        </motion.div>
      </AnimatePresence>
    </GlassCard>
  );
}
