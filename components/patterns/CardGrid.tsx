import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type CardGridProps = {
  children: ReactNode;
  className?: string;
  columns?: 2 | 3 | 4;
};

const colClass = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

export function CardGrid({ children, className, columns = 3 }: CardGridProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-6", colClass[columns], className)}>{children}</div>
  );
}

export default CardGrid;
