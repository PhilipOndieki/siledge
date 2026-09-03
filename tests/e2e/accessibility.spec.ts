import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = ["/", "/about", "/products", "/contact"];

test.describe("Accessibility", () => {
  for (const path of pages) {
    test(`has no serious or critical violations on ${path}`, async ({ page }) => {
      // Entrance animations respect prefers-reduced-motion (see lib/motion.ts
      // and app/providers.tsx); emulating it here means axe inspects the
      // settled DOM instead of an in-transition, partially-transparent frame.
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(path);
      // Belt and braces: reduced motion can still tween opacity over its
      // configured duration rather than jumping instantly, so give any
      // above-the-fold entrance reveal time to reach its settled state
      // before inspecting contrast.
      await page.waitForTimeout(800);
      const results = await new AxeBuilder({ page }).analyze();

      const seriousOrCritical = results.violations.filter(
        (violation) => violation.impact === "serious" || violation.impact === "critical",
      );

      expect(seriousOrCritical, JSON.stringify(seriousOrCritical, null, 2)).toEqual([]);
    });
  }
});
