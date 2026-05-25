import { test, expect } from '@playwright/test';

const BASE = 'https://api.practicesoftwaretesting.com';

test.describe('Integration - API + UI', () => {

  test('product fetched via API is visible in UI', async ({ request, page }) => {
    // Step 1: get a real product name from the API
    const res = await request.get(`${BASE}/products`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    const productName: string = body.data[0].name;

    // Step 2: search for it in the UI
    await page.goto('https://practicesoftwaretesting.com');
    await page.getByTestId('search-query').fill(productName);
    await page.getByTestId('search-submit').click();

    // Step 3: assert it appears
    await expect(
      page.locator('[data-test="product"]').filter({ hasText: productName }).first()
    ).toBeVisible({ timeout: 8000 });
  });

});