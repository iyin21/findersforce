import { test, expect } from "@playwright/test"

const URL = "http:localhost:3000/login"

test("login with email and password", async ({ page }) => {
    await page.goto(URL)
    
    // password does not meet requirements
    await page.locator('input[id=email] >> visible=true').fill('abiodun@timothy.com')
    await page.locator('input[id=password] >> visible=true').fill('123456')
    await page.locator('button[type="submit"]').click()
    const alert = page.locator('#alert')
    await expect(alert).toContainText("Error!Password must contain at least 8 characters")

    // Login with wrong credentials
    await page.locator('input[id=email] >> visible=true').fill('abiodun@timothy.com')
    await page.locator('input[id=password] >> visible=true').fill('12345678')
    await page.locator('button[type="submit"]').click() 
    const alert2 = page.locator('#alert')
    await expect(alert2).toContainText("Error!Invalid username or password")

    // successful login
    await page.fill("#email", "tomsmith@gmail.com")
    await page.fill("#password", "SuperSecretPassword!")
    await page.click('button[type="submit"]')
    await page.goto('http:localhost:3000/dashboard')
})
