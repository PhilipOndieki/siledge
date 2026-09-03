"use client";

import { Children, isValidElement, type ReactNode } from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/cn";
import { fadeUpLarge, staggerParent } from "@/lib/motion";

export type RevealProps = {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
  staggerAmount?: number;
  amount?: number;
  as?: "div" | "section";
};

export function Reveal({
  children,
  className,
  stagger = false,
  staggerAmount = 0.08,
  amount = 0.25,
  as = "div",
}: RevealProps) {
  const MotionTag = as === "section" ? m.section : m.div;

  const content = stagger
    ? Children.map(children, (child) =>
        isValidElement(child) ? <m.div variants={fadeUpLarge}>{child}</m.div> : child,
      )
    : children;

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={stagger ? staggerParent(staggerAmount) : fadeUpLarge}
    >
      {content}
    </MotionTag>
  );
}

export default Reveal;
