import { test, expect } from '@playwright/test';

const BASE = 'https://api.practicesoftwaretesting.com';

test.describe('Auth API', () => {

  test('POST /users/login returns token for valid credentials', async ({ request }) => {
    const res = await request.post(`${BASE}/users/login`, {
      data: {
        email: 'customer@practicesoftwaretesting.com',
        password: 'welcome01',
      },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('access_token');
    expect(typeof body.access_token).toBe('string');
  });

  test('POST /users/login returns 401 for wrong password', async ({ request }) => {
    const res = await request.post(`${BASE}/users/login`, {
      data: {
        email: 'customer@practicesoftwaretesting.com',
        password: 'wrongpassword',
      },
    });
    expect(res.status()).toBe(401);
  });

  test('POST /users/login returns 422 for missing fields', async ({ request }) => {
    const res = await request.post(`${BASE}/users/login`, {
      data: {},
    });
  expect([401, 422]).toContain(res.status());
  });

  test('response time is under 2000ms', async ({ request }) => {
    const start = Date.now();
    await request.post(`${BASE}/users/login`, {
      data: {
        email: 'customer@practicesoftwaretesting.com',
        password: 'welcome01',
      },
    });
    expect(Date.now() - start).toBeLessThan(2000);
  });

});