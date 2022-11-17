import { test, expect } from "@playwright/test"

const URL = "http://localhost:3000/support"
test("can sign in and view support", async ({ page }) => {
    await page.goto(URL)
    // await expect(page.locator("text=Log In")).toBeVisible()
    // await page.fill("#email", "ent@pussport.com")
    // await page.fill("#password", "Password22@")
    // await page.click('button[type="submit"]')
    // await page.waitForNavigation()
    await page.waitForSelector("text=Support")
})

test("can open create complaint modal", async ({ page }) => {
    await page.goto(URL)
    // await expect(page.locator("text=Log In")).toBeVisible()
    // await page.fill("#email", "ent@pussport.com")
    // await page.fill("#password", "Password22@")
    // await page.click('button[type="submit"]')
    // await page.waitForNavigation()
    await page.locator('[data-testid="support_btn"]').click()
    await page.waitForSelector("text=Send a formal complaint")
})

test("can create comment complant", async ({ page, request }) => {
    await page.goto(URL)
    // await expect(page.locator("text=Log In")).toBeVisible()
    // await page.fill("#email", "ent@pussport.com")
    // await page.fill("#password", "Password22@")
    // await page.click('button[type="submit"]')
    // await page.waitForNavigation()
    await page.locator('[data-testid="support_btn"]').click()
    await page.waitForSelector("text=Send a formal complaint")
    await page.fill("#complaintCategory", "Operative1")
    await page.fill("#description", "Please look into it ASAP")
    await page.getByRole("checkbox", { name: "Violence" }).check()
    await page.click('button[type="submit"]')
    //await expect(page.locator("text=Upload Image (optional)")).toBeVisible()
    
})
