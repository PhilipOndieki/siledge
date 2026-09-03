import { CardGrid } from "@/components/patterns/CardGrid";
import type { Category } from "@/lib/content/schema";
import { CategoryCard } from "./CategoryCard";

export type CategoryGridProps = {
  categories: Category[];
};

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <CardGrid columns={4}>
      {categories.map((category) => (
        <CategoryCard key={category.slug} category={category} />
      ))}
    </CardGrid>
  );
}

export default CategoryGrid;
