import { HelpCircle, type LucideProps } from "lucide-react";
import { iconRegistry, isIconName } from "@/lib/icons";
import { cn } from "@/lib/cn";

export type IconProps = {
  name: string;
  className?: string;
} & Omit<LucideProps, "ref" | "className">;

export function Icon({ name, className, ...props }: IconProps) {
  const Component = isIconName(name) ? iconRegistry[name] : HelpCircle;
  return <Component className={cn("h-5 w-5", className)} aria-hidden="true" {...props} />;
}

export default Icon;
