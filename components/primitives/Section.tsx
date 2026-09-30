import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type SectionProps = {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  tone?: "mist" | "white" | "dark";
  as?: "section" | "div";
  id?: string;
};

const sizeClass = {
  sm: "py-10 md:py-14",
  md: "py-16 md:py-20",
  lg: "py-20 md:py-28",
  xl: "py-16 md:flex md:min-h-[100dvh] md:flex-col md:justify-center md:py-32 lg:py-40",
} as const;

const toneClass = {
  mist: "bg-siledge-mist",
  white: "bg-white",
  dark: "bg-siledge-ink text-white",
} as const;

export function Section({
  children,
  className,
  size = "md",
  tone,
  as = "section",
  id,
}: SectionProps) {
  const Tag = as;
  return (
    <Tag id={id} className={cn(sizeClass[size], tone ? toneClass[tone] : undefined, className)}>
      {children}
    </Tag>
  );
}

export default Section;
