import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("loads with visible hero copy and a category card navigates to filtered products", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toContainText("industrial excellence");
    await expect(page.getByText(/across East Africa/)).toBeVisible();

    const bearingsCard = page.locator('a[href="/products#bearings"]').first();
    await bearingsCard.scrollIntoViewIfNeeded();
    await bearingsCard.click();

    await expect(page).toHaveURL(/\/products#bearings$/);
  });
});
