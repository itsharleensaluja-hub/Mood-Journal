import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function TypewriterText({ text, speed = 30, onComplete }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!text) return;
    setDisplayedText('');
    setIsComplete(false);

    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  if (!text) return null;

  return (
    <p className="text-sm text-ink-700 dark:text-ink-300 leading-relaxed whitespace-pre-wrap">
      {displayedText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-0.5 h-3.5 bg-plum-400 ml-0.5 align-middle"
          aria-hidden="true"
        />
      )}
    </p>
  );
}
