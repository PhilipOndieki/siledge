import { ImagePlaceholder } from "@/components/primitives/ImagePlaceholder";
import type { Product } from "@/lib/content/schema";

export type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="rounded-xl border border-siledge-blue/10 bg-white p-4 shadow-card">
      <ImagePlaceholder label={product.name} image={product.image} aspect="square" />
      <p className="mt-3 text-center text-sm font-medium text-siledge-ink">{product.name}</p>
    </div>
  );
}

export default ProductCard;
