"use client";

import { cn } from "@/lib/cn";
import type { Category } from "@/lib/content/schema";

export type CategoryChipsProps = {
  categories: Category[];
  activeSlug: string;
  onSelect: (slug: string) => void;
};

export function CategoryChips({ categories, activeSlug, onSelect }: CategoryChipsProps) {
  return (
    <div
      role="tablist"
      aria-label="Product categories"
      className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-2 lg:hidden"
    >
      {categories.map((category) => {
        const isActive = category.slug === activeSlug;
        return (
          <button
            key={category.slug}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(category.slug)}
            className={cn(
              "flex-shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200",
              isActive
                ? "border-siledge-blue bg-siledge-blue text-white"
                : "border-siledge-blue/20 bg-white text-siledge-slate",
            )}
          >
            {category.name}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryChips;
