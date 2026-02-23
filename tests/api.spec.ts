import {  test, expect } from '@playwright/test';

const BASE_URL = 'https://api.restful-api.dev';
let createdObjectId: string;

// 1. Get list of all objects
test('Get list of all objects', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/objects`);
  console.log('URL:', `${BASE_URL}/objects`);
  console.log('Response status:', response.status());
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  expect(Array.isArray(data)).toBe(true);
  expect(data.length).toBeGreaterThan(0);
});

//2. Add an object using POST
test('Add an object using POST', async ({ request }) => {
  const response = await request.post(`${BASE_URL}/objects`, {
    data: {
      name: 'Playwright Test Object',
      data: { key: 'value' }
    }
  });
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  expect(data.name).toBe('Playwright Test Object');
  expect(data.data.key).toBe('value');
  expect(data.id).toBeDefined();
  createdObjectId = data.id;
  console.log('Created object ID:', data.id);
});

// 3. Get a single object using the above added ID
test('Get single object by ID', async ({ request }) => {
  test.skip(!createdObjectId, 'No object created yet');
  const response = await request.get(`${BASE_URL}/objects/${createdObjectId}`);
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  expect(data.id).toBe(createdObjectId);
  expect(data.name).toBe('Playwright Test Object');
});

// 4. Update the object added in Step 2
test('Update the object', async ({ request }) => {
  test.skip(!createdObjectId, 'No object created yet');
  const response = await request.put(`${BASE_URL}/objects/${createdObjectId}`, {
    data: {
      name: 'Updated Test Object',
      data: { key: 'newValue' }
    }
  });
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  expect(data.name).toBe('Updated Test Object');
  expect(data.data.key).toBe('newValue');
});

// 5. Delete the object using DELETE
test('Delete the object', async ({ request }) => {
  test.skip(!createdObjectId, 'No object created yet');
  const response = await request.delete(`${BASE_URL}/objects/${createdObjectId}`);
  expect(response.status()).toBe(200); 
  expect(response.ok()).toBeTruthy();
 // const data = await response.json();
  const expectedResponse = await request.get(`${BASE_URL}/objects/${createdObjectId}`);
  expect(expectedResponse.status()).toBe(404);
});

//6. Verify deleted object cannot be fetched
test('Get deleted object', async ({ request }) => {
  test.skip(!createdObjectId, 'No object created yet');
  const response = await request.get(`${BASE_URL}/objects/${createdObjectId}`);
  expect(response.status()).toBe(404);
});
