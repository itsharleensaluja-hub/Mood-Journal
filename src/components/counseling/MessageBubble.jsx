import { motion } from 'framer-motion';

export function MessageBubble({ message, isUser, showAvatar }) {
  const time = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {showAvatar && !isUser && (
        <div className="w-8 h-8 rounded-full bg-plum-100 dark:bg-plum-800 flex items-center justify-center flex-shrink-0 border border-plum-200 dark:border-plum-700">
          <span className="text-xs font-medium text-plum-500 dark:text-plum-300">CS</span>
        </div>
      )}
      {showAvatar && isUser && (
        <div className="w-8 h-8 rounded-full bg-herb-100 dark:bg-herb-800 flex items-center justify-center flex-shrink-0 border border-herb-200 dark:border-herb-700">
          <span className="text-xs text-herb-500 dark:text-herb-300">You</span>
        </div>
      )}

      <div className={`max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`
            rounded-2xl px-4 py-2.5
            ${isUser
              ? 'bg-plum-500/10 dark:bg-plum-400/15 rounded-tr-md'
              : 'bg-earth-50 dark:bg-ink-800/50 border border-earth-200/50 dark:border-ink-700/30 rounded-tl-md'
            }
          `}
        >
          <p className="text-sm text-ink-800 dark:text-ink-200 leading-relaxed whitespace-pre-wrap">
            {message.text}
          </p>
        </div>
        <span className="text-[10px] text-ink-400 dark:text-ink-500 mt-1 block px-1">
          {time}
        </span>
      </div>
    </motion.div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-plum-100 dark:bg-plum-800 flex items-center justify-center flex-shrink-0 border border-plum-200 dark:border-plum-700">
        <span className="text-xs font-medium text-plum-500 dark:text-plum-300">CS</span>
      </div>
      <div className="rounded-2xl rounded-tl-md px-4 py-3 bg-earth-50 dark:bg-ink-800/50 border border-earth-200/50 dark:border-ink-700/30">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.12 }}
              className="w-1.5 h-1.5 rounded-full bg-plum-300 dark:bg-plum-500"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
