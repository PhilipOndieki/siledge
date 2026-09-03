import { describe, expect, it } from "vitest";
import {
  getCategories,
  getCategory,
  getCompany,
  getFeaturedCategories,
  getIndustries,
  getProductCount,
  getProducts,
  getProductsByCategory,
  getServices,
  searchProducts,
} from "./queries";

describe("content queries", () => {
  it("getCompany returns the company record", () => {
    const company = getCompany();
    expect(company.shortName).toBe("Siledge");
    expect(company.contact.phones.length).toBeGreaterThan(0);
  });

  it("getCategories returns all categories sorted by order", () => {
    const categories = getCategories();
    expect(categories.length).toBe(8);
    for (let i = 1; i < categories.length; i += 1) {
      const prev = categories[i - 1];
      const curr = categories[i];
      expect(prev).toBeDefined();
      expect(curr).toBeDefined();
      if (prev && curr) {
        expect(prev.order).toBeLessThan(curr.order);
      }
    }
  });

  it("getCategory finds a category by slug and returns null for unknown slugs", () => {
    expect(getCategory("bearings")?.name).toBe("Bearings");
    expect(getCategory("does-not-exist")).toBeNull();
  });

  it("getFeaturedCategories respects the limit", () => {
    expect(getFeaturedCategories(3)).toHaveLength(3);
    expect(getFeaturedCategories().length).toBeGreaterThan(0);
  });

  it("getProducts returns every product", () => {
    expect(getProducts().length).toBeGreaterThan(0);
  });

  it("getProductsByCategory returns only matching products", () => {
    const bearings = getProductsByCategory("bearings");
    expect(bearings.length).toBeGreaterThan(0);
    expect(bearings.every((product) => product.categorySlug === "bearings")).toBe(true);
  });

  it("getProductsByCategory returns an empty array for an unknown category", () => {
    expect(getProductsByCategory("unknown-category")).toEqual([]);
  });

  it("getProductCount matches the product list length", () => {
    expect(getProductCount("bearings")).toBe(getProductsByCategory("bearings").length);
  });

  it("getServices and getIndustries return non-empty lists", () => {
    expect(getServices().length).toBe(8);
    expect(getIndustries().length).toBe(8);
  });

  it("searchProducts finds products by case-insensitive substring", () => {
    const results = searchProducts("bearing");
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((p) => p.name.toLowerCase().includes("bearing"))).toBe(true);
  });

  it("searchProducts returns an empty array for a blank term", () => {
    expect(searchProducts("   ")).toEqual([]);
  });

  it("query results are frozen and cannot be mutated", () => {
    const categories = getCategories();
    expect(Object.isFrozen(categories)).toBe(true);
    const [first] = categories;
    expect(first).toBeDefined();
    expect(Object.isFrozen(first)).toBe(true);
  });
});
