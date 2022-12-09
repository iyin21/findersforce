import { test, expect } from "@playwright/test"

const URL = "http://localhost:3000/subscriptions"

test("Subscription page is visible", async ({ page }) => {
    await page.goto(URL)

    await expect(page.locator("text=Log In")).toBeVisible()
    await page.fill("#email", "ent@pussport.com")
    await page.fill("#password", "Password22@")
    await page.click('button[type="submit"]')
    await page.waitForSelector("text=Subscriptions")
})

