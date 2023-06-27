export{};
const mongoose = require('mongoose');

export interface IPost {
  _id: string;
  user: string; // This is the ID of the User, stored as a string
  movie: {
    id: number;
    title: string;
    director: string;
  };
  title: string;
  content: string;
  rating: number;
  createdAt?: Date; // "?" denotes this field is optional, because it has a default value
  updatedAt?: Date; // same here
}

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  movie: {
    id: Number,
    title: String,
    director: String
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
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

const Post = mongoose.model('Post', postSchema);
module.exports=Post;

