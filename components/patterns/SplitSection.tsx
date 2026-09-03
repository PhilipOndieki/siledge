import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type SplitSectionProps = {
  left: ReactNode;
  right: ReactNode;
  reverse?: boolean;
  className?: string;
};

export function SplitSection({ left, right, reverse = false, className }: SplitSectionProps) {
  return (
    <div className={cn("grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16", className)}>
      <div className={cn(reverse ? "lg:order-2" : undefined)}>{left}</div>
      <div className={cn(reverse ? "lg:order-1" : undefined)}>{right}</div>
    </div>
  );
}

export default SplitSection;
