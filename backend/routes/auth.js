import express from 'express';

import User from '../models/User.js';
import { generateAuthToken } from '../utils/jwtUtils.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    const user = new User({ profile: { name }, email, password, role: role === 'admin' ? 'admin' : 'user' });
    await user.save();
    const token = generateAuthToken({ id: user.id, email: user.email, role: user.role });
    res.cookie('authToken', token, { httpOnly: true, secure: false, maxAge: parseInt(process.env.JWT_COOKIE_AGE) });
    const { password: _, ...data } = user.toObject();
    res.status(201).json({ user: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = generateAuthToken({ id: user.id, email: user.email, role: user.role });
    res.cookie('authToken', token, { httpOnly: true, secure: false, maxAge: parseInt(process.env.JWT_COOKIE_AGE) });
    const { password: _, ...data } = user.toObject();
    res.json({ user: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;