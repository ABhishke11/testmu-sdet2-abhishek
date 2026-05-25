import { test, expect } from '@playwright/test';
import { validateSchema } from '../../utils/schemaValidator';
import { loadJSON } from '../../utils/dataLoader';

const BASE = 'https://api.practicesoftwaretesting.com';
const schema = loadJSON<object>('test_data/schemas/product.schema.json');

test.describe('Products API', () => {

  test('GET /products returns list of products', async ({ request }) => {
    const res = await request.get(`${BASE}/products`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('GET /products response matches schema', async ({ request }) => {
    const res = await request.get(`${BASE}/products`);
    const body = await res.json();
    validateSchema(body.data[0], schema);
  });

  test('GET /products?between=price,10,50 filters by price', async ({ request }) => {
    const res = await request.get(`${BASE}/products?between=price,10,50`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('GET /products/{invalid-id} returns 404', async ({ request }) => {
    const res = await request.get(`${BASE}/products/nonexistent-id-000`);
    expect(res.status()).toBe(404);
  });

  test('GET /products response time is under 2000ms', async ({ request }) => {
    const start = Date.now();
    await request.get(`${BASE}/products`);
    expect(Date.now() - start).toBeLessThan(2000);
  });

});