const request = require('supertest');
const { app, start, stop } = require('../server');
const Post = require('../models/post');
const User = require('../models/user');
const Movie = require('../models/movie');
const Comment = require('../models/comment');

const { TextEncoder } = require('util');
global.TextEncoder = TextEncoder;

describe('User routes', () => {
  let user; 
  
  beforeEach(async () => {
    await User.deleteMany({});
    user = await User.create({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'testpassword',
      country: 'US',
      bio: 'Test user'
    });
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  describe('GET /users', () => {
    test('should return a list of users', async () => {
      const response = await request(app).get('/users');
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('POST /users', () => {
    test('should create a new user', async () => {
      const data = {
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'newpassword',
        country: 'US',
        bio: 'New user'
      };
      const response = await request(app).post('/users').send(data);
      expect(response.status).toBe(201);
      expect(response.body.username).toBe(data.username);
      expect(response.body.email).toBe(data.email);
      expect(response.body.password).toBe(data.password);
      expect(response.body.country).toBe(data.country);
      expect(response.body.bio).toBe(data.bio);
    });
  });

  describe('GET /users/:id', () => {
    test('should return a single user', async () => {
      const response = await request(app).get(`/users/${user._id}`);
      expect(response.status).toBe(200);
      expect(response.body.username).toBe(user.username);
      expect(response.body.email).toBe(user.email);
      expect(response.body.password).toBe(user.password);
      expect(response.body.country).toBe(user.country);
      expect(response.body.bio).toBe(user.bio);
    });
  });

  describe('PUT /users/:id', () => {
    test('should update a user', async () => {
      const data = {
        username: 'updateduser',
        email: 'updateduser@example.com',
        password: 'updatedpassword',
        country: 'UK',
        bio: 'Updated user'
      };
      const response = await request(app).put(`/users/${user._id}`).send(data);
      expect(response.status).toBe(200);
      expect(response.body.username).toBe(data.username);
      expect(response.body.email).toBe(data.email);
      expect(response.body.password).toBe(data.password);
      expect(response.body.country).toBe(data.country);
      expect(response.body.bio).toBe(data.bio);
    });
  });

  describe('DELETE /users/:id', () => {
    test('should delete a user', async () => {
      const response = await request(app).delete(`/users/${user._id}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('User deleted');
    });
  });
});
