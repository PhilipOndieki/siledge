import { Card } from "@/components/primitives/Card";
import type { Category } from "@/lib/content/schema";

export type CategoryCardProps = {
  category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Card 
      href={`/products#${category.slug}`}
      className="group flex flex-col items-center justify-between rounded-md bg-white p-10 shadow-sm transition-shadow duration-200 hover:shadow-md lg:p-12"
    >
      {/* Photo / Product Image Space */}
      <div className="flex h-56 w-full items-center justify-center p-2 lg:h-64">
        {category.image ? (
          <img
            src={category.image}
            alt={category.name}
            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded border border-dashed border-gray-200 bg-gray-50 text-xs font-medium text-gray-400">
            [ Photo Placeholder: {category.name} ]
          </div>
        )}
      </div>

      {/* Product Title Only */}
      <h3 className="mt-8 text-center font-display text-base font-bold uppercase tracking-wider text-siledge-ink transition-colors duration-200 group-hover:text-siledge-blue">
        {category.name}
      </h3>
    </Card>
  );
}

export default CategoryCard;