import { test, expect } from "@playwright/test"

const URL = "http://localhost:3000/messaging"
test("can sign in and view messaging", async ({ page }) => {
    await page.goto(URL)
    await expect(page.locator("text=Log In")).toBeVisible()
    await page.fill("#email", "ent@pussport.com")
    await page.fill("#password", "Password22@")
    await page.click('button[type="submit"]')
    await page.waitForNavigation()
    // Expect a title "to contain" a substring.
    await expect(page.locator("text=Members")).toBeVisible()
    //await expect(page.locator("text=Search")).toBeVisible()
    
    
})
test("can open drawer", async ({ page }) => {
    await page.goto(URL)
    await expect(page.locator("text=Log In")).toBeVisible()
    await page.fill("#email", "ent@pussport.com")
    await page.fill("#password", "Password22@")
    await page.click('button[type="submit"]')
    await page.waitForNavigation()
    // Expect a title "to contain" a substring.
    await expect(page.locator("text=Members")).toBeVisible()
    await page.locator('[data-testid="menu_btn"]').click()
    await page.waitForSelector("text=New Group")
    
    
})
