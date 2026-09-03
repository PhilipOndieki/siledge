"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import type { Category, Product } from "@/lib/content/schema";
import { CategorySidebar } from "./CategorySidebar";
import { CategoryChips } from "./CategoryChips";
import { ProductGrid } from "./ProductGrid";

export type ProductsBrowserProps = {
  categories: Category[];
  products: Product[];
};

// This component receives its full product list as a prop and filters on the
// client. That is correct at today's scale (8 categories, ~50 products).
// When the catalogue passes roughly 300 products, switch to
// `/products/[category]` with `generateStaticParams` instead: this component
// already treats "which products am I showing" as a prop, so that becomes a
// routing change, not a rewrite of this file.
export function ProductsBrowser({ categories, products }: ProductsBrowserProps) {
  const firstSlug = categories[0]?.slug ?? "";
  const [activeSlug, setActiveSlug] = useState(firstSlug);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && categories.some((category) => category.slug === hash)) {
      setActiveSlug(hash);
    }
  }, [categories]);

  useEffect(() => {
    function handleHashChange() {
      const hash = window.location.hash.replace("#", "");
      if (hash && categories.some((category) => category.slug === hash)) {
        setActiveSlug(hash);
      }
    }
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [categories]);

  const selectCategory = useCallback((slug: string) => {
    setActiveSlug(slug);
    window.history.replaceState(null, "", `#${slug}`);
  }, []);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const product of products) {
      map[product.categorySlug] = (map[product.categorySlug] ?? 0) + 1;
    }
    return map;
  }, [products]);

  const activeCategory =
    categories.find((category) => category.slug === activeSlug) ?? categories[0];
  const filteredProducts = useMemo(
    () => products.filter((product) => product.categorySlug === activeSlug),
    [products, activeSlug],
  );

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
      <CategorySidebar
        categories={categories}
        counts={counts}
        activeSlug={activeSlug}
        onSelect={selectCategory}
      />
      <div>
        <CategoryChips categories={categories} activeSlug={activeSlug} onSelect={selectCategory} />
        <AnimatePresence mode="wait">
          <m.div
            key={activeSlug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2, staggerChildren: 0.04 } }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            <ProductGrid
              products={filteredProducts}
              categoryName={activeCategory?.name ?? "this category"}
            />
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ProductsBrowser;
