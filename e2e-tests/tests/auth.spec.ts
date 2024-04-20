import { test, expect } from '@playwright/test';

const UI_URL='http://localhost:5173/'

test('should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole('link', {name:'Sign in'}).click()
  await expect(page.getByRole('heading', {name:'Sign In'})).toBeVisible()
  await page.locator("[name=email]").fill('varun1@varun1.com')
  await page.locator("[name=password]").fill('varun1')
  await page.getByRole("button", { name : 'Login'}).click()

  await expect(page.getByText('Sign In Successful')).toBeVisible()
  await expect(page.getByRole('link', {name:'My Bookings'})).toBeVisible()
  await expect(page.getByRole('link', {name:'My Hotels'})).toBeVisible()
  await expect(page.getByRole('button', {name:'Sign Out'})).toBeVisible()
  // await page.close()
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
