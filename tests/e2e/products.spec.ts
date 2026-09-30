import { test, expect } from "@playwright/test";

test.use({ viewport: { width: 1280, height: 900 } });

test.describe("Products page", () => {
  test("clicking a sidebar category swaps the grid and updates the URL hash", async ({ page }) => {
    await page.goto("/products");

    await page.getByRole("button", { name: /Pulleys/ }).click();

    await expect(page).toHaveURL(/#pulleys$/);
    await expect(page.getByText("Taper Lock Pulleys").first()).toBeVisible();
  });

  test("a deep link to /products#seals opens with that category active", async ({ page }) => {
    await page.goto("/products#seals");

    await expect(page.getByRole("button", { name: /Seals/ })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(page.getByText("Hydraulic Seals").first()).toBeVisible();
  });
});
