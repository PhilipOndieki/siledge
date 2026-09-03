import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductGrid } from "./ProductGrid";
import type { Product } from "@/lib/content/schema";

const products: Product[] = [
  {
    id: "deep-groove-ball-bearings",
    name: "Deep Groove Ball Bearings",
    categorySlug: "bearings",
    blurb: null,
    image: null,
    specs: {},
  },
];

describe("ProductGrid", () => {
  it("renders a card per product", () => {
    render(<ProductGrid products={products} categoryName="Bearings" />);
    expect(screen.getAllByText("Deep Groove Ball Bearings").length).toBeGreaterThan(0);
  });

  it("renders a named empty state with a link back to all products when the list is empty", () => {
    render(<ProductGrid products={[]} categoryName="Bearings" />);
    expect(screen.getByText(/No products listed in Bearings yet/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view all products/i })).toHaveAttribute(
      "href",
      "/products",
    );
  });
});
