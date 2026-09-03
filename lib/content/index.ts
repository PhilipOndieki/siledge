import { z } from "zod";
import { iconNames } from "@/lib/icons";
import { companyData } from "./data/company";
import { categoriesData } from "./data/categories";
import { productsData } from "./data/products";
import { servicesData } from "./data/services";
import { industriesData } from "./data/industries";
import {
  categorySchema,
  companySchema,
  industrySchema,
  productSchema,
  serviceSchema,
  type Category,
  type Company,
  type Industry,
  type Product,
  type Service,
} from "./schema";

class ContentError extends Error {
  constructor(message: string) {
    super(`[content] ${message}`);
    this.name = "ContentError";
  }
}

function parseArray<Output>(
  schema: z.ZodType<Output, z.ZodTypeDef, unknown>,
  data: unknown[],
  label: string,
): Output[] {
  const results: Output[] = [];
  data.forEach((item, index) => {
    const parsed = schema.safeParse(item);
    if (!parsed.success) {
      const issues = parsed.error.issues
        .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
        .join("\n");
      throw new ContentError(
        `Invalid ${label} record at index ${index}.\n${issues}\n` +
          `          Fix lib/content/data/${label}.ts.`,
      );
    }
    results.push(parsed.data);
  });
  return results;
}

function assertKnownIcon(icon: string, context: string): void {
  if (!iconNames.includes(icon)) {
    throw new ContentError(
      `${context} references unknown icon "${icon}".\n` +
        `          Known icons: ${iconNames.join(", ")}.\n` +
        `          Fix the record or add the icon to lib/icons.ts.`,
    );
  }
}

const company: Company = (() => {
  const parsed = companySchema.safeParse(companyData);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
      .join("\n");
    throw new ContentError(
      `Invalid company record.\n${issues}\n          Fix lib/content/data/company.ts.`,
    );
  }
  return parsed.data;
})();

company.pillars.forEach((pillar) => {
  assertKnownIcon(pillar.icon, `Company pillar "${pillar.title}"`);
});
company.trustPoints.forEach((point) => {
  assertKnownIcon(point.icon, `Company trust point "${point.title}"`);
});

const categories: Category[] = parseArray(categorySchema, categoriesData, "categories");
const products: Product[] = parseArray(productSchema, productsData, "products");
const services: Service[] = parseArray(serviceSchema, servicesData, "services");
const industries: Industry[] = parseArray(industrySchema, industriesData, "industries");

const categorySlugSet = new Set<string>();
for (const category of categories) {
  if (categorySlugSet.has(category.slug)) {
    throw new ContentError(
      `Duplicate category slug "${category.slug}".\n` +
        `          Fix lib/content/data/categories.ts.`,
    );
  }
  categorySlugSet.add(category.slug);
  assertKnownIcon(category.icon, `Category "${category.name}"`);
}

const categoryOrders = new Set<number>();
for (const category of categories) {
  if (categoryOrders.has(category.order)) {
    throw new ContentError(
      `Duplicate category order value ${category.order} (category "${category.slug}").\n` +
        `          Every category needs a unique order. Fix lib/content/data/categories.ts.`,
    );
  }
  categoryOrders.add(category.order);
}

const productIdSet = new Set<string>();
const productCountByCategory = new Map<string, number>();
for (const product of products) {
  if (productIdSet.has(product.id)) {
    throw new ContentError(
      `Duplicate product id "${product.id}".\n          Fix lib/content/data/products.ts.`,
    );
  }
  productIdSet.add(product.id);

  if (!categorySlugSet.has(product.categorySlug)) {
    throw new ContentError(
      `Product "${product.id}" references unknown category "${product.categorySlug}".\n` +
        `          Known categories: ${Array.from(categorySlugSet).join(", ")}.\n` +
        `          Fix lib/content/data/products.ts or add the category to categories.ts.`,
    );
  }

  productCountByCategory.set(
    product.categorySlug,
    (productCountByCategory.get(product.categorySlug) ?? 0) + 1,
  );
}

for (const category of categories) {
  if (!productCountByCategory.has(category.slug)) {
    throw new ContentError(
      `Category "${category.slug}" has no products.\n` +
        `          Every category needs at least one product. Add one in lib/content/data/products.ts.`,
    );
  }
}

for (const service of services) {
  assertKnownIcon(service.icon, `Service "${service.name}"`);
}

for (const industry of industries) {
  assertKnownIcon(industry.icon, `Industry "${industry.name}"`);
}

const sortedCategories = Object.freeze(
  [...categories]
    .sort((a, b) => a.order - b.order)
    .map((category) => Object.freeze({ ...category })),
);
const frozenProducts = Object.freeze(products.map((product) => Object.freeze({ ...product })));
const frozenServices = Object.freeze(services.map((service) => Object.freeze({ ...service })));
const frozenIndustries = Object.freeze(
  industries.map((industry) => Object.freeze({ ...industry })),
);
const frozenCompany = Object.freeze(company);

const productsByCategory = new Map<string, Product[]>();
for (const product of frozenProducts) {
  const list = productsByCategory.get(product.categorySlug) ?? [];
  list.push(product);
  productsByCategory.set(product.categorySlug, list);
}
for (const [slug, list] of productsByCategory) {
  productsByCategory.set(slug, Object.freeze(list) as Product[]);
}

const categoriesBySlug = new Map<string, Category>(
  sortedCategories.map((category) => [category.slug, category]),
);

export const contentStore = {
  company: frozenCompany,
  categories: sortedCategories as Category[],
  products: frozenProducts as Product[],
  services: frozenServices as Service[],
  industries: frozenIndustries as Industry[],
  categoriesBySlug,
  productsByCategory,
};
