import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
};

export function Container({ children, className, as = "div" }: ContainerProps) {
  const Tag = as;
  return (
    <Tag className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</Tag>
  );
}

export default Container;
