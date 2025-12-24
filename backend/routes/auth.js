import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

/* ================= SIGN UP ================= */
router.post('/signup', async (req, res) => {
  try {
    const { username, password, captchaAnswer, captchaExpected } = req.body;

    // Captcha check
    if (captchaAnswer !== captchaExpected) {
      return res.status(400).json({ message: 'Captcha verification failed' });
    }

    // Check existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ================= LOGIN ================= */
router.post('/login', async (req, res) => {
  try {
    const { username, password, captchaAnswer, captchaExpected } = req.body;

    // Captcha check
    if (captchaAnswer !== captchaExpected) {
      return res.status(400).json({ message: 'Captcha verification failed' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
