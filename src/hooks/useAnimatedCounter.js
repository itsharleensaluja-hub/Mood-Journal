import { useState, useEffect } from 'react';
import { useMotionValue, useMotionValueEvent, animate } from 'framer-motion';

const easing = [0.22, 1, 0.36, 1];

export function useAnimatedCounter(target, duration = 1.5) {
  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, target, {
      duration,
      ease: easing,
    });
    return controls.stop;
  }, [target, duration, count]);

  useMotionValueEvent(count, 'change', (latest) => {
    setDisplayValue(Math.round(latest));
  });

  return displayValue;
}
