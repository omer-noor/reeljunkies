const request = require('supertest');
const { app, start, stop } = require('../server');
const Movie = require('../models/movie');
const { generateMovie } = require('../faker/fakeData');

// Describe block to group related tests for Movie Routes
describe('Movie Routes', () => {
  // Before each test, clear the Movies collection
  beforeEach(async () => {
    await Movie.deleteMany({});
  });

  // Test GET all movies route
  test('GET /movies', async () => {
    // Add some test data
    const movies = [];
    for (let i = 0; i < 2; i++) {
      const fakeMovie = generateMovie();
      const movie = new Movie(fakeMovie);
      await movie.save();
      movies.push(movie);
    }

    // Send GET request to "/movies" endpoint using supertest
    const res = await request(app).get('/movies');

    // Expect the response status code to be 200 (OK)
    expect(res.statusCode).toBe(200);

    // Expect the response body to be an array with length of 2
    expect(res.body).toHaveLength(2);
  });

  // Test POST a new movie route
  test('POST /movies', async () => {
    const fakeMovie = generateMovie();

    // Send POST request to "/movies" endpoint with test data using supertest
    const res = await request(app)
      .post('/movies')
      .send(fakeMovie);

    // Expect the response status code to be 201 (Created)
    expect(res.statusCode).toBe(201);

    // Expect the response body to have the expected values for name and director
    expect(res.body.name).toBe(fakeMovie.name);
    expect(res.body.director).toBe(fakeMovie.director);
  });

  // Test GET one movie by ID route
  test('GET /movies/:id', async () => {
    // Add test data
    const fakeMovie = generateMovie();
    const movie = new Movie(fakeMovie);
    await movie.save();

    // Send GET request to "/movies/:id" endpoint using supertest
    const res = await request(app).get(`/movies/${movie._id}`);

    // Expect the response status code to be 200 (OK)
    expect(res.statusCode).toBe(200);

    // Expect the response body to have the expected values for name and director
    expect(res.body.name).toBe(fakeMovie.name);
    expect(res.body.director).toBe(fakeMovie.director);
  });

  // Test PUT movie by ID route
  test('PUT /movies/:id', async () => {
    // Add test data
    const fakeMovie = generateMovie();
    const movie = new Movie(fakeMovie);
    await movie.save();

    const updatedFakeMovie = generateMovie();

    // Send PUT request to "/movies/:id" endpoint with updated data using supertest
    const res = await request(app)
      .put(`/movies/${movie._id}`)
      .send(updatedFakeMovie);

    // Expect the response status code to be 200 (OK)
    expect(res.statusCode).toBe(200);

    // Expect the response body to have the updated values for name and director
    expect(res.body.name).toBe(updatedFakeMovie.name);
    expect(res.body.director).toBe(updatedFakeMovie.director);
  });

  // Test DELETE movie by ID route
test('DELETE /movies/:id', async () => {
  // Add test data
  const fakeMovie = generateMovie();
  const movie = new Movie(fakeMovie);
  await movie.save();

  // Send DELETE request to "/movies/:id" endpoint using supertest
  const res = await request(app).delete(`/movies/${movie._id}`);

  // Expect the response status code to be 200 (OK)
  expect(res.statusCode).toBe(200);

  // Expect the response body message to be 'Movie deleted'
  expect(res.body.message).toBe('Movie deleted');

  // Verify that the movie was deleted from the database
  const deletedMovie = await Movie.findById(movie._id);
  expect(deletedMovie).toBeNull();
});

});