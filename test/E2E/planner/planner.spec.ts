import { test } from '@playwright/test';
const URL = "http:localhost:3000/planner"

test ("a user can view planner  page", async ({page}) => {
                await page.goto(URL);
                // expect a title "to contain" a substring.
                await page.fill('#email', "ent@pussport.com" );
                await page.fill('#password', "Password22@");

                await page.click('button[type="submit"]');
                await page.waitForSelector('text=Planner')
})