import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  "You're growing beautifully, keep going!",
  "Every day counts. You're doing amazing!",
  "Your consistency is blooming into something beautiful",
  "Look how far you've come! Keep nurturing yourself",
  "You're building a garden of emotional strength",
  "Small steps every day create lasting change",
  "Your dedication is inspiring! Keep showing up",
  "Growth takes time, and you're proving that every day",
];

export function MotivationalMessage({ streak }) {
  const messageIndex = Math.min(streak, messages.length - 1);
  const message = messages[messageIndex] || messages[messages.length - 1];

  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={messageIndex}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.25 }}
        className="text-sm text-ink-500 dark:text-ink-400 italic"
      >
        {message}
      </motion.p>
    </AnimatePresence>
  );
}
