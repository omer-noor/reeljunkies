export{};
const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const isAuthenticated = require('../middleware/isAuthenticated');
const encryption = require('bcrypt');
const jwt = require('jsonwebtoken');

// GET /users
router.get('/', async (req: any, res: { json: (arg0: any) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /user by token
router.get('/token', isAuthenticated, (req: { userId: any; }, res: { json: (arg0: any) => any; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): any; new(): any; }; }; }) => {
  console.log("HERE")
  userModel.findById(req.userId)
    .then((user: any) => res.json(user))
    .catch((err: any) => res.status(500).json({ message: 'Something went wrong' }));
});

// POST /users
router.post('/', async (req: { body: { username: any; email: any; password: any; country: any; bio: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
  try {
    const user = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      country: req.body.country,
      bio: req.body.bio
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /users/:id
router.get('/:id', async (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; json: (arg0: any) => void; }) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'userModel not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /users/:id
router.put('/:id', isAuthenticated, async (req: { params: { id: any; }; body: { username: any; email: any; password: any; country: any; bio: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; json: (arg0: any) => void; }) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.params.id, {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      country: req.body.country,
      bio: req.body.bio,
      updatedAt: Date.now()
    }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'userModel not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /users/:id
router.delete('/:id', isAuthenticated, async (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; json: (arg0: { message: string; }) => void; }) => {
  try {
    
    const user = await userModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'userModel not found' });
    }
    res.json({ message: 'userModel deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

//Login USER

router.post('/login', async (req: { body: { email: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; json: (arg0: { token: any; user: any; }) => void; }) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: 'userModel not found' });
    }

    const passwordMatch = await encryption.compare(req.body.password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
