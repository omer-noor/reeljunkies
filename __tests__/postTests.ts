const request = require('supertest');
const { app, start, stop } = require('../server');
const Post = require('../models/post');
const User = require('../models/user');
const Movie = require('../models/movie');
const Comment = require('../models/comment');
const { generateUser, generateMovie, generatePost } = require('../faker/fakeData');

export{};
// Add beforeAll and afterAll hooks to start and stop the server
test('GET /posts/:id', async () => {
  const user = await User.create(generateUser());
  const movie = await Movie.create(generateMovie());
  const post = await Post.create(generatePost(user, movie));

  const res = await request(app).get(`/posts/${post._id}`);
  expect(res.statusCode).toBe(200);
  expect(res.body.title).toBe(post.title);
  expect(res.body.content).toBe(post.content);
});

// PUT /posts/:id
test('PUT /posts/:id', async () => {
  const user = await User.create(generateUser());
  const movie = await Movie.create(generateMovie());
  const post = await Post.create(generatePost(user, movie));

  const res = await request(app)
    .put(`/posts/${post._id}`)
    .send({
      user: user._id, // Pass the correct user ID
      movie: movie._id, // Pass the correct movie ID
      title: 'Updated Post 1',
      content: 'Updated test content 1',
      rating: 3.5
    });

  expect(res.statusCode).toBe(200);
  expect(res.body.title).toBe('Updated Post 1');
  expect(res.body.content).toBe('Updated test content 1');
  expect(res.body.rating).toBe(3.5);
});

// DELETE /posts/:id
test('DELETE /posts/:id', async () => {
  const user = await User.create(generateUser());
  const movie = await Movie.create(generateMovie());
  const post = await Post.create(generatePost(user, movie));

  const res = await request(app).delete(`/posts/${post._id}`);
  expect(res.statusCode).toBe(200);
  expect(res.body.message).toBe('Post deleted');

  const deletedPost = await Post.findById(post._id);
  expect(deletedPost).toBeNull();
});
