import Link from "next/link";
import { CardGrid } from "@/components/patterns/CardGrid";
import { getUiCopy } from "@/lib/content/queries";
import type { Product } from "@/lib/content/schema";
import { ProductCard } from "./ProductCard";

export type ProductGridProps = {
  products: Product[];
  categoryName: string;
};

export function ProductGrid({ products, categoryName }: ProductGridProps) {
  const ui = getUiCopy();

  if (products.length === 0) {
    return (
      <div
        role="status"
        className="rounded-xl border border-dashed border-siledge-blue/20 bg-white p-12 text-center"
      >
        <p className="font-display text-lg font-semibold text-siledge-ink">
          No products listed in {categoryName} yet
        </p>
        <p className="mt-2 text-sm text-siledge-slate">{ui.productsEmptyState.body}</p>
        <Link
          href="/products"
          className="mt-4 inline-block text-sm font-semibold text-siledge-blue hover:text-siledge-blueBright"
        >
          {ui.buttons.viewAllProducts}
        </Link>
      </div>
    );
  }

  return (
    <CardGrid columns={3}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </CardGrid>
  );
}

export default ProductGrid;
