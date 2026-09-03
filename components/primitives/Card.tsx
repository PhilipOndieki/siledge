import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type CardProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  as?: "div" | "article";
};

const cardClass =
  "group block rounded-xl border border-siledge-blue/10 bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-cardHover";

export function Card({ children, className, href, as = "div" }: CardProps) {
  if (href) {
    return (
      <Link href={href} className={cn(cardClass, className)}>
        {children}
      </Link>
    );
  }

  const Tag = as;
  return <Tag className={cn(cardClass, className)}>{children}</Tag>;
}

export default Card;
