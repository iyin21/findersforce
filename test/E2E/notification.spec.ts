import { test, expect } from "@playwright/test"

const URL = "http://localhost:3000/dashboard"

test("Dashboard page is visible", async ({ page }) => {
    await page.goto(URL)

    await expect(page.locator("text=Log In")).toBeVisible()
    await page.fill("#email", "ent@pussport.com")
    await page.fill("#password", "Password22@")
    await page.click('button[type="submit"]')
    await page.waitForSelector('text=Dashboard');
 //   await expect(page.locator("text='Dashboard'")).toBeVisible();
})

test("Check that the Notification icon is showing properly", async ({ page }) => {
    await page.goto(URL)

    await expect(page.locator("text=Log In >> visible=true")).toBeVisible()
    await page.fill("#email", "ent@pussport.com")
    await page.fill("#password", "Password22@")
    await page.click('button[type="submit"]')
    await page.waitForSelector('text=Dashboard');
//    await expect(page.locator("text='Dashboard'")).toBeVisible();

    await expect(page.locator('[data-testid="notification"]')).toBeVisible()
})

test("Check that the notification modal opens properly", async ({ page }) => {
    await page.goto(URL)

    await expect(page.locator("text=Log In >> visible=true")).toBeVisible()
    await page.fill("#email", "ent@pussport.com")
    await page.fill("#password", "Password22@")
    await page.click('button[type="submit"]')
    await page.waitForSelector('text=Dashboard');
//    await expect(page.locator("text='Dashboard'")).toBeVisible();
    await page.locator('[data-testid="notification"]').click()
    await page.waitForSelector("text=Notifications")
})
