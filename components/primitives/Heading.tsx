import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type HeadingProps = {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4;
  className?: string;
  tone?: "ink" | "blue" | "white" | "slate";
};

const levelClass = {
  1: "text-4xl md:text-6xl font-bold",
  2: "text-3xl md:text-4xl font-bold",
  3: "text-2xl md:text-3xl font-semibold",
  4: "text-xl font-semibold",
} as const;

const toneClass = {
  ink: "text-siledge-ink",
  blue: "text-siledge-blue",
  white: "text-white",
  slate: "text-siledge-slate",
} as const;

export function Heading({ children, level = 2, className, tone = "ink" }: HeadingProps) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";
  return (
    <Tag
      className={cn("font-display tracking-tight", levelClass[level], toneClass[tone], className)}
    >
      {children}
    </Tag>
  );
}

export default Heading;
