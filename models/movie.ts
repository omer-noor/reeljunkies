const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Document = mongoose.Document;

export interface IMovie extends Document {
  _id: string;
  name: string;
  poster: string;
  releaseDate: Date;
  director: string;
  actors: string[];
  summary?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  poster: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  director: { type: String, required: true },
  actors: { type: [String] },
  summary: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports=Movie;

