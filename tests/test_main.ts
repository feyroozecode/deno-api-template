import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import app from '../main.ts';

describe('Main Application', () => {
  test('GET / should return 200 status', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  test('GET /nonexistent should return 404', async () => {
    const response = await request(app).get('/nonexistent');
    expect(response.statusCode).toBe(404);
  });

  test('GET / should return expected response body', async () => {
    const response = await request(app).get('/');
    expect(response.text).toContain('Hello, World!'); // Adjust based on your actual response
  });
});
