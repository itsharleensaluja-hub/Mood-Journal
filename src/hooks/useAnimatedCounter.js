import { useEffect, useRef } from 'react';
import { useMotionValue, useTransform, animate } from 'framer-motion';

const easing = [0.22, 1, 0.36, 1];

export function useAnimatedCounter(target, duration = 1.5) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const prevTarget = useRef(0);

  useEffect(() => {
    const controls = animate(count, target, {
      duration,
      ease: easing,
      onComplete: () => {
        prevTarget.current = target;
      },
    });
    return controls.stop;
  }, [target, duration, count]);

  return rounded;
}
