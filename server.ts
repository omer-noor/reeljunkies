const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();


const commentRoutes = require('./routes/comment');
const movieRoutes = require('./routes/movie');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

app.use(express.json());
app.use(cors());
app.use('/comments', commentRoutes);
app.use('/movies', movieRoutes);
app.use('/posts', postRoutes);
app.use('/users', userRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Handle any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Initialize the server variable outside of the mongoose.connect() call
let server = null;

mongoose.connect(process.env.MONGODB_URI, {
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
