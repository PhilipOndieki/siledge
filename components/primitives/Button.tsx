import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  className?: string;
  withArrow?: boolean;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  target?: string;
  rel?: string;
};

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-md font-display font-semibold tracking-wide transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const sizeClass = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
} as const;

const variantClass = {
  primary: "bg-siledge-blue text-white hover:bg-siledge-blueBright",
  secondary: "bg-white text-siledge-blue border border-siledge-blue hover:bg-siledge-mist",
  ghost: "text-siledge-blue hover:text-siledge-blueBright",
} as const;

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  withArrow = false,
  href,
  type = "button",
  disabled,
  onClick,
  target,
  rel,
}: ButtonProps) {
  const classes = cn(baseClass, sizeClass[size], variantClass[variant], className);
  const content = (
    <>
      {children}
      {withArrow ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} target={target} rel={rel} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {content}
    </button>
  );
}

export default Button;
