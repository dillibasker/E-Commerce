import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const router = express.Router();

/* ================= SIGN UP ================= */
router.post('/signup', async (req, res) => {
  try {
    const { username,email, password, captchaAnswer, captchaExpected } = req.body;

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
      email,
      password
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/logout', async (req, res) => {
  try {
    const token = req.cookies.sessionToken;
    if (token) {
      await User.updateOne({ sessionToken: token }, { $unset: { sessionToken: "" } });
    }
    res.clearCookie('sessionToken').json({ message: 'Logged out' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/me', async (req, res) => {
  try {
    console.log("Cookies received:", req.cookies);

    const token = req.cookies.sessionToken;
      console.log("Cookies:", req.cookies); // 👈 ADD THIS

    if (!token) return res.status(401).json({ message: 'Not authenticated' });

    const user = await User.findOne({ sessionToken: token }).select('-password -resetToken -resetTokenExpiry');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
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

    // Create a simple session token (could also use JWT)
    const token = crypto.randomBytes(32).toString('hex');
    user.sessionToken = token;
    await user.save();

    // Set token in HTTP-only cookie
    res
      .cookie('sessionToken', token, {
        httpOnly: true,
        secure: false, // set true in production with HTTPS
        sameSite: 'lax',
        path: '/', 
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Forgot Password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Email not found' });

    // Generate a token
    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`; // your frontend URL
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`
    });

    res.json({ message: 'Reset email sent' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Reset Password
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    user.password = password; // You can hash it using bcrypt
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default router;
