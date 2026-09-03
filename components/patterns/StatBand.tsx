import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type StatBandItem = {
  key: string;
  icon: ReactNode;
  label: string;
};

export type StatBandProps = {
  items: StatBandItem[];
  className?: string;
};

export function StatBand({ items, className }: StatBandProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6", className)}>
      {items.map((item) => (
        <div key={item.key} className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30">
            {item.icon}
          </div>
          <p className="text-sm font-medium text-white">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

export default StatBand;
