import { test, expect } from "@playwright/test"

const URL = "http://localhost:3000/roles&permission"

test("show that roles and permission displays properly", async ({ page }) => {
    await page.goto(URL)

    await expect(page.locator("text=Log In")).toBeVisible()
    await page.fill("#email", "ent@pussport.com")
    await page.fill("#password", "Password22@")
    await page.click('button[type="submit"]')
    await page.waitForSelector("text=Roles and permission")
})

test("Check that add a user modal opens properly", async ({ page }) => {
    await page.goto(URL)

    await expect(page.locator("text=Log In")).toBeVisible()
    await page.fill("#email", "ent@pussport.com")
    await page.fill("#password", "Password22@")
    await page.click('button[type="submit"]')
    await page.waitForSelector("text=Roles and permission")

    await page.locator('[data-testid="add_user"]').click()
    await page.waitForSelector("text=Add Shift Manager(s)")
})
