import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CategorySidebar } from "./CategorySidebar";
import type { Category } from "@/lib/content/schema";

const categories: Category[] = [
  {
    slug: "bearings",
    name: "Bearings",
    order: 1,
    tagline: "Precision",
    attributes: ["Precision"],
    description: "A category with enough description to pass validation.",
    icon: "circle-dot",
    featured: true,
    image: null,
  },
  {
    slug: "oil-seals",
    name: "Oil Seals",
    order: 2,
    tagline: "Leak protection",
    attributes: ["Leak protection"],
    description: "A category with enough description to pass validation.",
    icon: "droplet",
    featured: true,
    image: null,
  },
];

describe("CategorySidebar", () => {
  it("marks the active category and calls onSelect when another is clicked", async () => {
    const onSelect = vi.fn();
    render(
      <CategorySidebar
        categories={categories}
        counts={{ bearings: 8, "oil-seals": 8 }}
        activeSlug="bearings"
        onSelect={onSelect}
      />,
    );

    expect(screen.getByRole("button", { name: /Bearings/ })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: /Oil Seals/ })).toHaveAttribute(
      "aria-pressed",
      "false",
    );

    await userEvent.click(screen.getByRole("button", { name: /Oil Seals/ }));
    expect(onSelect).toHaveBeenCalledWith("oil-seals");
  });
});
