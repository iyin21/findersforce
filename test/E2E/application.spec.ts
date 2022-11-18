import { test, expect } from "@playwright/test"

const URL = "http://localhost:3000/pending"
test("can sign in and view applications", async ({ page }) => {
    await page.goto(URL)
    await expect(page.locator("text=Log In")).toBeVisible()
    await page.fill("#email", "ent@pussport.com")
    await page.fill("#password", "Password22@")
    await page.click('button[type="submit"]')
    await page.waitForNavigation()
    // Expect a title "to contain" a substring.
    await expect(page.locator("text=Applications")).toBeVisible()
    await expect(page.locator("text=Pending")).toBeVisible()
    await expect(page.locator("text=Accepted")).toBeVisible()
    
})

// test("renders application and links to single application page", async ({
//     page,
// }) => {
//     await page.goto(URL)

//     await expect(page.locator("text=Log In")).toBeVisible()
//     await page.fill("#email", "ent@pussport.com")
//     await page.fill("#password", "Password22@")
//     await page.click('button[type="submit"]')
//     await page.waitForNavigation()
//     // Expect a title "to contain" a substring.
//     // Wait for the page to load
//     await page.waitForLoadState("networkidle")
//     await expect(page.locator('h5:has-text("Applications")')).toBeVisible();
//     if ((await page.locator('h5:has-text("Nothing to see here")')) !== null) {
//         await page.locator('[data-testid="view_application"]').nth(0).click()
//         await expect(page.locator('heading="Qualification"')).toBeVisible()
//     }
// })

// test("renders application and links to single application page and shift history page", async ({
//     page,
// }) => {
//     await page.goto(URL)

//     await expect(page.locator("text=Log In")).toBeVisible()
//     await page.fill("#email", "ent@pussport.com")
//     await page.fill("#password", "Password22@")
//     await page.click('button[type="submit"]')
//     await page.waitForNavigation()
//     // Expect a title "to contain" a substring.
//     await expect(page.locator('h5:has-text("Applications")')).toBeVisible();
//     if ((await page.locator('h5:has-text("Nothing to see here")')) !== null) {
//         await page.locator('[data-testid="view_application"]').nth(0).click()
//         await expect(page.locator('heading="Qualification"')).toBeVisible()
//         await page.locator("text=View shift history").click()

//         await expect(page.locator("text=Shift History")).toBeVisible()
//     }
// })
