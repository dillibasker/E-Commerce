import express from 'express';
import Order from '../models/Order.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { sendOrderEmail } from '../utils/sendOrderEmail.js';

const router = express.Router();

/* CREATE ORDER */
router.post('/', authMiddleware, async (req, res) => {
  try {
    const order = new Order({
      ...req.body,
      user: req.user._id
    });

    await order.save();

    // ✅ WhatsApp notification
    await sendOrderEmail(order);

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* GET MY ORDERS */
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
