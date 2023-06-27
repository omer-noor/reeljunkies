export{};
const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');
const Movie = require('../models/movie');

// GET all posts
router.get('/', async (req: any, res: { json: (arg0: any) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
  try {
    const posts = await Post.find().populate('user movie').sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

//Get posts by a user
router.get('/user/:userId', async (req: { params: { userId: any; }; }, res: { json: (arg0: any) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ user: userId }).populate('user movie').sort({ updatedAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



// POST a new post
router.post('/', async (req: { body: { user: any; movie: { id: any; title: any; director: any; }; title: any; content: any; rating: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: any; }): void; new(): any; }; }; }) => {
  try {
    const user = await User.findById(req.body.user);
    if (!user) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    const post = await new Post({
      user: user._id,
      movie: {
        id: req.body.movie.id,
        title: req.body.movie.title,
        director: req.body.movie.director
      },
      title: req.body.title,
      content: req.body.content,
      rating: req.body.rating
    }).save();
    res.status(201).json(post);
  } catch (error:any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});


// GET a post by ID
router.get('/:id', async (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; json: (arg0: any) => void; }) => {
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
router.put('/:id', async (req: { params: { id: any; }; body: { movie: any; title: any; content: any; rating: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; json: (arg0: any) => void; }) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, {
      movie: req.body.movie, // movie is now just a string
      title: req.body.title,
      content: req.body.content,
      rating: req.body.rating,
      updatedAt: Date.now()
    }, { new: true }).populate('user'); // don't populate movie as it is no longer a mongoose model
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
router.delete('/:id', async (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; json: (arg0: { message: string; }) => void; }) => {
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

