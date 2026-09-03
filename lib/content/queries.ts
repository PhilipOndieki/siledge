import { contentStore } from "./index";
import { uiData } from "./data/ui";
import type { Category, Company, Industry, Product, Service } from "./schema";

export function getCompany(): Company {
  return contentStore.company;
}

export function getCategories(): Category[] {
  return contentStore.categories;
}

export function getCategory(slug: string): Category | null {
  return contentStore.categoriesBySlug.get(slug) ?? null;
}

export function getFeaturedCategories(limit?: number): Category[] {
  const featured = contentStore.categories.filter((category) => category.featured);
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}

export function getProducts(): Product[] {
  return contentStore.products;
}

export function getProductsByCategory(slug: string): Product[] {
  return contentStore.productsByCategory.get(slug) ?? [];
}

export function getProductCount(slug: string): number {
  return getProductsByCategory(slug).length;
}

export function getServices(): Service[] {
  return contentStore.services;
}

export function getIndustries(): Industry[] {
  return contentStore.industries;
}

export function getUiCopy(): typeof uiData {
  return uiData;
}

export function searchProducts(term: string): Product[] {
  const normalized = term.trim().toLowerCase();
  if (normalized.length === 0) {
    return [];
  }
  return contentStore.products.filter((product) => product.name.toLowerCase().includes(normalized));
}
