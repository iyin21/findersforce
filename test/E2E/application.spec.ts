import test, { expect } from "@playwright/test";

test("can sign in and view applications", async ({ page }) => {
    await page.goto("/pending");
    // Expect a title "to contain" a substring.
    await expect(page.locator("text=Applications")).toBeVisible();
    await expect(page.locator("text=Pending")).toBeVisible();
    await expect(page.locator("text=Accepted")).toBeVisible();
    // await page.fill('input[name="phoneNumber"]', "7012766294");
    // await page.fill('input[name="password"]', "password123");
    // await page.click('button[type="submit"]');
  
    // await page.waitForNavigation();
  
    // expect(page.locator('h2:has-text("beans 2")'));
  });

test("renders application and links to single application page", async ({ page }) => {
    await page.goto("/pending");

    await expect(page.locator("text=Applications")).toBeVisible();
    await page.click('[view application"]')
    await expect(page.locator('heading="Qualification"')).toBeVisible();
})