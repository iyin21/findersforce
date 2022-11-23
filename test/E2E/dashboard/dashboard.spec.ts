import { test, expect } from '@playwright/test';
const URL = "http:localhost:3000/dashboard"

test("renders dashboard and links to view ongoing shifts", async ({page}) => {
                await page.goto(URL);
                // expect a title "to contain" a substring.
                await expect(page.locator("text=Log In")).toBeVisible();
                await page.fill('#email', "ent@pussport.com" );
                await page.fill('#password', "Password22@");

                await page.click('button[type="submit"]');
                await page.waitForSelector('text=Dashboard');

                await page.click("[data-testid='ongoingData_link']");
                await expect(page.locator('text=Operatives turn up for their shifts in one glance')).toBeVisible();
});

test("renders dashboard and links to view upcoming shifts", async ({page}) => {
                await page.goto(URL);
                // expect a title "to contain" a substring.
                await expect(page.locator("text=Log In")).toBeVisible();
                await page.fill('#email', "ent@pussport.com" );
                await page.fill('#password', "Password22@");

                await page.click('button[type="submit"]');
                await page.waitForSelector('text=Dashboard');

                await page.click("[data-testid='upcomingData_link']");
                await expect(page.locator('text=Operatives turn up for their shifts in one glance')).toBeVisible();
});