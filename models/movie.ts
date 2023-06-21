const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  actors: {
    type: [String]
  },
  summary: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Movie', movieSchema);
