"use client";

import type { ReactNode } from "react";
import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

export default Providers;
