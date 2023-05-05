const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');
const Movie = require('../models/movie');

// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('user movie');
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST a new post
router.post('/', async (req, res) => {
  try {
    const user = await User.findById(req.body.user);
    const movie = await Movie.findById(req.body.movie);
    if (!user || !movie) {
      return res.status(400).json({ message: 'Invalid user or movie ID' });
    }
    const post = await new Post({
      user: user._id,
      movie: movie._id,
      title: req.body.title,
      content: req.body.content,
      rating: req.body.rating
    }).save();
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET a post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user movie');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update a post by ID
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      content: req.body.content,
      rating: req.body.rating,
      updatedAt: Date.now()
    }, { new: true }).populate('user movie');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE a post by ID
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
