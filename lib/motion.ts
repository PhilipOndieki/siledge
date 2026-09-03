import type { Variants } from "framer-motion";

export const easing = [0.22, 1, 0.36, 1] as const;

export const durations = {
  fast: 0.2,
  base: 0.6,
  slow: 0.7,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.slow, ease: easing },
  },
};

export const fadeUpLarge: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.base, ease: easing },
  },
};

export function staggerParent(stagger = 0.08, delay = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };
}

export const heroStagger = staggerParent(0.15);
