"use client";

import type { ReactNode } from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/cn";
import { fadeUp, heroStagger } from "@/lib/motion";
import { Container } from "@/components/primitives/Container";

export type PageHeroProps = {
  heading: ReactNode;
  supportingLine?: string;
  className?: string;
};

export function PageHero({ heading, supportingLine, className }: PageHeroProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-[40vh] items-center overflow-hidden bg-gradient-to-br from-siledge-ink to-siledge-blueDeep",
        className,
      )}
    >
      <div className="absolute inset-0 bg-siledge-blue/20" aria-hidden="true" />
      <Container className="relative z-10 py-16">
        <m.div initial="hidden" animate="visible" variants={heroStagger}>
          <m.h1
            variants={fadeUp}
            className="font-display text-4xl font-bold text-white md:text-5xl"
          >
            {heading}
          </m.h1>
          {supportingLine ? (
            <m.p variants={fadeUp} className="mt-4 max-w-prose text-lg text-white/80">
              {supportingLine}
            </m.p>
          ) : null}
        </m.div>
      </Container>
    </div>
  );
}

export default PageHero;
