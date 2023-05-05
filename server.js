const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;

const commentRoutes = require('./routes/comment');
const movieRoutes = require('./routes/movie');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

app.use(express.json());
app.use('/comments', commentRoutes);
app.use('/movies', movieRoutes);
app.use('/posts', postRoutes);
app.use('/users', userRoutes);

// Initialize the server variable outside of the mongoose.connect() call
let server = null;

mongoose.connect('mongodb://127.0.0.1/moviedatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  // Check if the environment is not 'test'
  if (process.env.NODE_ENV !== 'test') {
    // Assign the value to the server variable inside the .then() block
    server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}).catch((error) => {
  console.error(error);
});

function start() {
  return new Promise((resolve) => {
    server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      resolve();
    });
  });
}

function stop() {
  return new Promise((resolve, reject) => {
    if (server) {
      server.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    } else {
      reject(new Error('Server not initialized'));
    }
  });
}

module.exports = { app, start, stop };
