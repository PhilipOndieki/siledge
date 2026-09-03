import { test, expect } from "@playwright/test";

test.describe("Contact form", () => {
  test("shows field errors and does not navigate when required fields are empty", async ({
    page,
  }) => {
    await page.goto("/contact");

    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByText("Enter your full name.")).toBeVisible();
    await expect(page.getByText("Enter a valid email address.")).toBeVisible();
    await expect(page).toHaveURL(/\/contact$/);
  });
});
