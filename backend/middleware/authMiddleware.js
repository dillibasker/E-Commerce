import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.sessionToken;
    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const user = await User.findOne({ sessionToken: token });
    if (!user) {
      return res.status(401).json({ message: 'Invalid session' });
    }

    req.user = user; // 👈 attach user to request
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default authMiddleware;
