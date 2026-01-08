import express from 'express';
import Order from '../models/Order.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { sendOrderEmail } from '../utils/sendOrderEmail.js';

const router = express.Router();

/* CREATE ORDER */
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { items, total, customerName, customerEmail, address } = req.body;

    if (!items || items.length === 0 || !customerName || !customerEmail || !address) {
      return res.status(400).json({ message: "Missing required order fields" });
    }

    const order = new Order({
      ...req.body,
      user: req.user._id
    });

    await order.save();

    try {
      await sendOrderEmail(order);
    } catch (emailError) {
      console.error("Email error:", emailError.message);
      // Email error should not block the order
    }

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
