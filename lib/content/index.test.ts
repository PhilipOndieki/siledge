import { afterEach, describe, expect, it, vi } from "vitest";

describe("content validation gate", () => {
  afterEach(() => {
    vi.doUnmock("./data/products");
    vi.doUnmock("./data/categories");
    vi.resetModules();
  });

  it("throws a clear, actionable error for a product referencing an unknown category", async () => {
    vi.resetModules();
    vi.doMock("./data/products", () => ({
      productsData: [
        {
          id: "tapered-roller-bearing",
          name: "Tapered Roller Bearing",
          categorySlug: "bearing",
          blurb: null,
          image: null,
          specs: {},
        },
      ],
    }));

    await expect(import("./index")).rejects.toThrow(
      /Product "tapered-roller-bearing" references unknown category "bearing"/,
    );
  });

  it("throws a clear, actionable error for a duplicate category order", async () => {
    vi.resetModules();
    vi.doMock("./data/categories", async () => {
      const actual = await vi.importActual<{ categoriesData: unknown[] }>("./data/categories");
      const [first, second, ...rest] = actual.categoriesData as Array<{ order: number }>;
      return {
        categoriesData: [{ ...first, order: 1 }, { ...second, order: 1 }, ...rest],
      };
    });

    await expect(import("./index")).rejects.toThrow(/Duplicate category order value/);
  });

  it("throws a clear, actionable error for an invalid schema field", async () => {
    vi.resetModules();
    vi.doMock("./data/categories", () => ({
      categoriesData: [
        {
          slug: "Bearings", // invalid: not kebab-case
          name: "Bearings",
          order: 1,
          tagline: "Precision",
          attributes: ["Precision"],
          description: "A category with an invalid slug for testing purposes.",
          icon: "circle-dot",
          featured: true,
          image: null,
        },
      ],
    }));

    await expect(import("./index")).rejects.toThrow(/Invalid categories record at index 0/);
  });

  it("loads successfully with the real content", async () => {
    vi.resetModules();
    const { contentStore } = await import("./index");
    expect(contentStore.categories.length).toBeGreaterThan(0);
  });
});
