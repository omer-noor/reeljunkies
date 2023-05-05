const faker = require('faker');

const generateUser = () => {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    country: faker.address.country(),
    bio: faker.lorem.paragraph()
  };
};

const generateMovie = () => {
  return {
    name: faker.lorem.words(),
    poster: faker.image.imageUrl(),
    releaseDate: faker.date.past(),
    director: faker.name.findName(),
    actors: [faker.name.findName(), faker.name.findName()],
    summary: faker.lorem.paragraph()
  };
};

const generatePost = (user, movie) => {
  return {
    user: user._id,
    movie: movie._id,
    title: faker.lorem.words(),
    content: faker.lorem.paragraph(),
    rating: faker.random.number({ min: 1, max: 5 })
  };
};

const generateComment = (user, post) => {
  return {
    user: user._id,
    post: post._id,
    content: faker.lorem.paragraph()
  };
};

module.exports = {
  generateUser,
  generateMovie,
  generatePost,
  generateComment
};
