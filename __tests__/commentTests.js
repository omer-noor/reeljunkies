const request = require('supertest');
const { app, start, stop } = require('../server');
const Post = require('../models/post');
const User = require('../models/user');
const Movie = require('../models/movie');
const Comment = require('../models/comment');
const {
  generateUser,
  generateMovie,
  generatePost,
  generateComment,
} = require('../faker/fakeData');

describe('Comment Routes', () => {  
  
  // Before each test, clear the Comments collection
  beforeEach(async () => {
    await Comment.deleteMany({});
  });

  // Test GET all comments route
  test('GET /comments', async () => {
    // Add some test data
    const user1 = await User.create(generateUser());
    const user2 = await User.create(generateUser());
    const movie1 = await Movie.create(generateMovie());
    const movie2 = await Movie.create(generateMovie());
    const post1 = await Post.create(generatePost(user1, movie1));
    const post2 = await Post.create(generatePost(user2, movie2));
    const comment1 = await Comment.create(generateComment(user1, post1));
    const comment2 = await Comment.create(generateComment(user2, post2));

    const res = await request(app).get('/comments');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  // Test POST a new comment route
  test('POST /comments', async () => {
    const user = await User.create(generateUser());
    const movie = await Movie.create(generateMovie());
    const post = await Post.create(generatePost(user, movie));

    const res = await request(app)
      .post('/comments')
      .send({
        user: user._id,
        post: post._id,
        content: 'Test content',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.user).toBe(user._id.toString());
    expect(res.body.post).toBe(post._id.toString());
    expect(res.body.content).toBe('Test content');
  });

  // Test GET one comment by ID route
  test('GET /comments/:id', async () => {
    // Add test data
    const user = await User.create(generateUser());
    const movie = await Movie.create(generateMovie());
    const post = await Post.create(generatePost(user, movie));
    const comment = await Comment.create(generateComment(user, post));

    // Send GET request to "/comments/:id" endpoint using supertest
    const res = await request(app).get(`/comments/${comment._id}`);

    // Expect the response status code to be 200 (OK)
    expect(res.statusCode).toBe(200);

    // Expect the response body to have the expected values for user, post, and content
    expect(res.body.user).toBe(user._id.toString());
    expect(res.body.post).toBe(post._id.toString());
    expect(res.body.content).toBe(comment.content);
  });

  // Test PUT comment by ID route
  test('PUT /comments/:id', async () => {
    // Add test data
    const user = await User.create(generateUser());
    const movie = await Movie.create(generateMovie());
    const post = await Post.create(generatePost(user, movie));
    const comment = await Comment.create(generateComment(user, post));

    // Send PUT request to "/comments/:id" endpoint with updated data using supertest
    const res = await request(app)
      .put(`/comments/${comment._id}`)
      .send({
        content: 'Updated test content',
      });

    // Expect the response status code to be 200 (OK)
    expect(res.statusCode).toBe(200);

// Expect the response body to have the updated content value
expect(res.body.content).toBe('Updated test content');
});

// Test DELETE comment by ID route
test('DELETE /comments/:id', async () => {
  // Add test data
  const user = await User.create(generateUser());
  const movie = await Movie.create(generateMovie());
  const post = await Post.create(generatePost(user, movie));
  const comment = await Comment.create(generateComment(user, post));

  // Send DELETE request to "/comments/:id" endpoint using supertest
  const res = await request(app).delete(`/comments/${comment._id}`);

  // Expect the response status code to be 200 (OK)
  expect(res.statusCode).toBe(200);

  // Expect the response body message to be 'Comment deleted'
  expect(res.body.message).toBe('Comment deleted');

  // Verify that the comment was deleted from the database
  const deletedComment = await Comment.findById(comment._id);
  expect(deletedComment).toBeNull();
});
});

module.exports = app;

