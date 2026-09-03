"use client";

import { cn } from "@/lib/cn";
import type { Category } from "@/lib/content/schema";

export type CategorySidebarProps = {
  categories: Category[];
  counts: Record<string, number>;
  activeSlug: string;
  onSelect: (slug: string) => void;
};

export function CategorySidebar({
  categories,
  counts,
  activeSlug,
  onSelect,
}: CategorySidebarProps) {
  return (
    <nav
      aria-label="Product categories"
      className="sticky top-24 hidden self-start rounded-xl border border-siledge-blue/10 bg-white p-2 lg:block"
    >
      <ul className="flex flex-col">
        {categories.map((category) => {
          const isActive = category.slug === activeSlug;
          return (
            <li key={category.slug}>
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => onSelect(category.slug)}
                className={cn(
                  "flex w-full items-center justify-between gap-2 rounded-md border-l-4 px-4 py-3 text-left text-sm transition-colors duration-200",
                  isActive
                    ? "border-siledge-blue bg-siledge-mist font-semibold text-siledge-blue"
                    : "border-transparent font-medium text-siledge-slate hover:bg-siledge-mist/60",
                )}
              >
                <span>{category.name}</span>
                <span className="text-xs text-siledge-slate/70">{counts[category.slug] ?? 0}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default CategorySidebar;
