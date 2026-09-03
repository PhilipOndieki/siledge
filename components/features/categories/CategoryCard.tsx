import { Card } from "@/components/primitives/Card";
import { Icon } from "@/components/primitives/Icon";
import type { Category } from "@/lib/content/schema";

export type CategoryCardProps = {
  category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Card href={`/products#${category.slug}`}>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-siledge-mist text-siledge-blue">
        <Icon name={category.icon} className="h-6 w-6" />
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold text-siledge-ink transition-colors duration-200 group-hover:text-siledge-blueBright">
        {category.name}
      </h3>
      <p className="mt-1 text-sm text-siledge-slate">{category.tagline}</p>
    </Card>
  );
}

export default CategoryCard;
