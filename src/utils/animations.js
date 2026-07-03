export const easing = [0.22, 1, 0.36, 1];

export const pageFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.35, ease: easing } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export const pageSlideUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easing } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2, ease: easing } },
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.04, delayChildren: 0.05 },
  },
};

export const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easing },
  },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.96 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: easing },
  },
};

export const slideInRight = {
  initial: { opacity: 0, x: 20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: easing },
  },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: easing },
  },
};

export const whileInViewStagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45, ease: easing },
};
