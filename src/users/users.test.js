import request from 'supertest';
import * as app from '../server.js'; // Assuming the server is exported from server.js

describe('API Tests for /api/users', () => {
  let createdUserId;

  it('should return an empty array on GET /api/users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should create a new user on POST /api/users', async () => {
    const newUser = {
      username: 'John Doe',
      age: 30,
      hobbies: ['reading', 'gaming']
    };

    const response = await request(app).post('/api/users').send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newUser);
    createdUserId = response.body.id;
  });

  it('should retrieve the created user on GET /api/users/:userId', async () => {
    const response = await request(app).get(`/api/users/${createdUserId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdUserId);
  });

  it('should update the created user on PUT /api/users/:userId', async () => {
    const updatedUser = {
      username: 'Jane Doe',
      age: 25,
      hobbies: ['traveling']
    };

    const response = await request(app).put(`/api/users/${createdUserId}`).send(updatedUser);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedUser);
  });

  it('should delete the created user on DELETE /api/users/:userId', async () => {
    const response = await request(app).delete(`/api/users/${createdUserId}`);
    expect(response.status).toBe(204);
  });

  it('should return 404 for a deleted user on GET /api/users/:userId', async () => {
    const response = await request(app).get(`/api/users/${createdUserId}`);
    expect(response.status).toBe(404);
  });
});