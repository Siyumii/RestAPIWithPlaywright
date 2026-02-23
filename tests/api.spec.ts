import { test, expect } from '@playwright/test';
const BASE_URL = 'https://api.restful-api.dev';
const API_KEY = '32d8c2ec-b374-4533-afd8-8de75edc5e5c';

let createdProductId: string;

//1. GET list of all objects in products collection
test('GET products', async ({ request }) => {
  const response = await request.get(
    `${BASE_URL}/collections/products/objects`,
    {
      headers: {
        'x-api-key': API_KEY,
      },
    }
  );
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body).toBeDefined();
});

//2. Add an object using POST.
test('Add a product object using POST', async ({ request }) => {
  const response = await request.post(
    `${BASE_URL}/collections/products/objects`,
    {
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      data: {
        name: 'Playwright Product',
        data: { key: 'value' }
      }
    }
  );
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.name).toBe('Playwright Product');
  expect(body.data.key).toBe('value');
  expect(body.id).toBeDefined();
  createdProductId = body.id;
});

//3. Get the object by ID using GET.
test('Get product object by ID', async ({ request }) => {
  test.skip(!createdProductId, 'No product created yet');
  const response = await request.get(
    `${BASE_URL}/collections/products/objects/${createdProductId}`,
    {
      headers: {
        'x-api-key': API_KEY,
      },
    }
  );
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.id).toBe(createdProductId);
  expect(body.name).toBe('Playwright Product');
});

//4. Update the Object added in step 2 using PUT.
test('Update product object using PUT', async ({ request }) => {
  test.skip(!createdProductId, 'No product created yet');
  const response = await request.put(
    `${BASE_URL}/collections/products/objects/${createdProductId}`,
    {
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      data: {
        name: 'Updated Playwright Product',
        data: { key: 'value added by PUT' }
      }
    }
  );
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.name).toBe('Updated Playwright Product');
  expect(body.data.key).toBe('value added by PUT');
});

//5. Update the object using PATCH. (partial update) //Only update the name field, and keep the 'data' field as it is.
test('Partial Update product object using PATCH', async ({ request }) => {
  test.skip(!createdProductId, 'No product created yet');
  const response = await request.patch(
    `${BASE_URL}/collections/products/objects/${createdProductId}`,
    {
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      data: {
        name: 'Updated Playwright Product Twice'
      }
    }
  );
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.name).toBe('Updated Playwright Product Twice');
  expect(body.data.key).toBe('value added by PUT'); //data field should remain unchanged
});

//6. Delete the object using DELETE.
test('Delete product object using DELETE', async ({ request }) => {
  test.skip(!createdProductId, 'No product created yet');
  const response = await request.delete(
    `${BASE_URL}/collections/products/objects/${createdProductId}`,
    {
      headers: {
        'x-api-key': API_KEY,
      },
    }
  );
  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();
  // Verify deleted object cannot be fetched
  const expectedResponse = await request.get(
    `${BASE_URL}/collections/products/objects/${createdProductId}`,
    {
      headers: {
        'x-api-key': API_KEY,
      },
    }
  );
  expect(expectedResponse.status()).toBe(404);
});
