import { test, expect } from "@playwright/test"

const URL = "http://localhost:3000/job-boards"

test("Job board page is visible", async ({ page }) => {
    await page.goto(URL)

    await expect(page.locator("text=Log In")).toBeVisible()
    await page.fill("#email", "ent@pussport.com")
    await page.fill("#password", "Password22@")
    await page.click('button[type="submit"]')
    await page.waitForSelector("text=Job Board")
})

test("Check that the job tables are showing properly", async ({ page }) => {
    await page.goto(URL)

    await expect(page.locator("text=Log In")).toBeVisible()
    await page.fill("#email", "ent@pussport.com")
    await page.fill("#password", "Password22@")
    await page.click('button[type="submit"]')
    await page.waitForSelector("text=Job Board")

    await expect(page.locator('[data-testid="job_tabs"]')).toBeVisible()
})

test("Check that post a job modal opens properly", async ({ page }) => {
    await page.goto(URL)

    await expect(page.locator("text=Log In")).toBeVisible()
    await page.fill("#email", "ent@pussport.com")
    await page.fill("#password", "Password22@")
    await page.click('button[type="submit"]')
    await page.waitForSelector("text=Job Board")

    await page.locator('[data-testid="job_post_btn"]').click()
    await page.waitForSelector("text=Post a job")
})
