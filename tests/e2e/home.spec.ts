import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe("Home Page", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  })

  test('should redirect to /connect with undefined server url', async ({ page }) => {
    await expect(page).toHaveTitle(/Reelix/);
    await expect(page).toHaveURL(/connect/);
  });
});
