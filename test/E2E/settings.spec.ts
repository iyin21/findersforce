import { test, expect } from "@playwright/test"

const URL = "http://localhost:3000/settings"

test("General Settings page is visible", async ({ page }) => {
    await page.goto(URL)

    await expect(page.locator("text=Log In")).toBeVisible()
    await page.fill("#email", "ent@pussport.com")
    await page.fill("#password", "Password22@")
    await page.click('button[type="submit"]')
    await expect(page.locator("text='General Information'")).toBeVisible();
})

test("Check that the general settings tabs are showing properly", async ({ page }) => {
    await page.goto(URL)

    await expect(page.locator("text=Log In >> visible=true")).toBeVisible()
    await page.fill("#email", "ent@pussport.com")
    await page.fill("#password", "Password22@")
    await page.click('button[type="submit"]')
    await expect(page.locator("text='General Information'")).toBeVisible();

    await expect(page.locator('[data-testid="general_settings_tabs"]')).toBeVisible()
})

test("Check that change password modal opens properly", async ({ page }) => {
    await page.goto(URL)

    await expect(page.locator("text=Log In >> visible=true")).toBeVisible()
    await page.fill("#email", "ent@pussport.com")
    await page.fill("#password", "Password22@")
    await page.click('button[type="submit"]')
    await expect(page.locator("text='General Information'")).toBeVisible();
    await page.locator('[id="settings"]').click()
    await page.locator('[data-testid="change_password_btn"]').click()
    await page.waitForSelector("text=Change Password")
})
