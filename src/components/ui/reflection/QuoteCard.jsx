import { motion, AnimatePresence } from 'framer-motion';
import { ArtifactCard } from '../../archive/ArtifactCard';
import { HandwrittenText } from '../../archive/HandwrittenText';

export function QuoteCard({ quote }) {
  if (!quote) return null;

  return (
    <ArtifactCard variant="tipped">
      <AnimatePresence mode="wait">
        <motion.div
          key={quote.text}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex items-start gap-3">
            <span className="text-brass-400 text-lg leading-none mt-1">"</span>
            <div>
              <HandwrittenText size="base" className="text-ink-700 dark:text-ink-300 leading-relaxed mb-2">
                {quote.text}
              </HandwrittenText>
              <HandwrittenText size="xs" color="ink-500">
                — {quote.author || 'Unknown'}
              </HandwrittenText>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </ArtifactCard>
  );
}
