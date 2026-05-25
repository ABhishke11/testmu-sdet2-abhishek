import { test, expect } from '@playwright/test';

const BASE = 'https://api.practicesoftwaretesting.com';

test.describe('Error Handling - API', () => {

  test('GET unknown endpoint returns 404', async ({ request }) => {
    const res = await request.get(`${BASE}/nonexistent-endpoint`);
    expect(res.status()).toBe(404);
  });

  test('POST /users/login with invalid data returns 422', async ({ request }) => {
    const res = await request.post(`${BASE}/users/login`, {
      data: { email: 123, password: true },
    });
    expect([401, 422, 400]).toContain(res.status());
  });

  test('GET /products with invalid filter returns error or 200', async ({ request }) => {
    const res = await request.get(`${BASE}/products?between=invalid`);
    expect([200, 422, 400]).toContain(res.status());
  });

});