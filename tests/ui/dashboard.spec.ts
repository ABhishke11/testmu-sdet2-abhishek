import { test, expect } from '../fixtures';

test.describe('Dashboard - UI', () => {

  test.beforeEach(async ({ dashboardPage }) => {
    await dashboardPage.goto();
  });

  test('products are visible on load', async ({ dashboardPage }) => {
    await dashboardPage.expectProductsVisible();
    const count = await dashboardPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test('search returns filtered results', async ({ dashboardPage }) => {
    await dashboardPage.searchFor('Hammer');
    const count = await dashboardPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test('search with no results shows empty state', async ({ dashboardPage, page }) => {
    await dashboardPage.searchFor('xyzproductthatdoesnotexist999');
    await expect(page.getByText(/No products found/i)).toBeVisible({ timeout: 8000 });
  });

  test('sort by price low to high works', async ({ dashboardPage, page }) => {
    await dashboardPage.sortBy('price,asc');
    const prices = page.locator('[data-test="product-price"]');
    const first = await prices.first().textContent();
    const last  = await prices.last().textContent();
    const parse = (s: string | null) => parseFloat(s?.replace(/[^0-9.]/g, '') ?? '0');
    expect(parse(first)).toBeLessThanOrEqual(parse(last));
  });

});