import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, captchaAnswer, captchaExpected } = req.body;

    if (Number(captchaAnswer) !== Number(captchaExpected)) {
      return res.status(400).json({ message: 'Captcha verification failed' });
    }

    const existingUser = await User.findOne({ 
      $or: [{ username }, { email }] 
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      verificationToken,
      isVerified: false
    });

    // ✅ Send verification email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const verifyLink = `${process.env.BASE_URL}/api/auth/verify/${verificationToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email',
      html: `
        <h2>Email Verification</h2>
        <p>Click below to verify your account:</p>
        <a href="${verifyLink}">Verify Email</a>
      `
    });

    res.status(201).json({
      message: 'Registration successful. Please verify your email.'
    });

  } catch (error) {
  console.error("SIGNUP ERROR:", error); // 👈 ADD THIS
  res.status(500).json({ message: "Server error" });
}
});

router.get("/check-verification/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    if (!user) {
      return res.status(404).json({ verified: false });
    }

    res.json({ verified: user.isVerified });

  } catch (error) {
    res.status(500).json({ verified: false });
  }
});

router.get('/verify/:token', async (req, res) => {
  try {
    const user = await User.findOne({
      verificationToken: req.params.token
    });

    if (!user) {
      return res.status(400).send('Invalid or expired token');
    }

    user.isVerified = true;
    user.verificationToken = undefined;

    await user.save();

res.redirect(`${process.env.FRONTEND_URL}/verification-success`);
  } catch (error) {
    res.status(500).send('Verification failed');
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, captchaAnswer, captchaExpected } = req.body;

    if (captchaAnswer !== captchaExpected) {
      return res.status(400).json({ message: 'Captcha verification failed' });
    }

    const user = await User.findOne({
      $or: [{ username }, { email: username }]
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid user' });
    }

    // ✅ ADD THIS CHECK
    if (!user.isVerified) {
      return res.status(401).json({
        message: 'Please verify your email before logging in',
        notVerified: true   // ✅ ADD THIS
      });
    }

    const token = crypto.randomBytes(32).toString('hex');
    user.sessionToken = token;
    await user.save();

    res.cookie('sessionToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
      maxAge: 24 * 60 * 60 * 1000
    }).json({ message: 'Login successful' });

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

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default router;
