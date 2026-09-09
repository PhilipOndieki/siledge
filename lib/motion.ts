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

export const slideUpAttach: Variants = {
  hidden: { opacity: 0, y: 120 },
  visible: {
    opacity: 1,
    y: 0,
    // easeInOut (not the shared `easing`) so the travel is spread evenly across
    // the full duration instead of front-loaded — the rise needs to be watched,
    // not snapped through in the first 100ms with a long invisible tail.
    transition: { duration: 1.4, ease: "easeInOut" },
  },
};

export const slideInFromLeft: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.2, ease: "easeInOut" },
  },
};

export const slideInFromRight: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.2, ease: "easeInOut" },
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
