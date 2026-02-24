import express from 'express';
import Order from '../models/Order.js';
import authMiddleware from '../middleware/authMiddleware.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';
const router = express.Router();
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});
/* CREATE ORDER */
router.post('/create-razorpay-order', authMiddleware, async (req, res) => {
  try {
    const { items, total, customerName, customerEmail, customerPhone, address } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Missing order items" });
    }

    // Create order in DB first (status pending)
    const newOrder = await Order.create({
      user: req.user._id,
      items,
      total,
      customerName,
      customerEmail,
      customerPhone,
      address,
      status: "pending"
    });

    // Create Razorpay Order
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(total * 100), // convert to paise
      currency: "INR",
      receipt: newOrder._id.toString()
    });

    res.json({
      orderId: newOrder._id,
      razorpayOrder
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/verify-payment', authMiddleware, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    // Update order status
    await Order.findByIdAndUpdate(orderId, {
      status: "paid"
    });

    res.json({ success: true });

  } catch (error) {
    res.status(500).json({ message: error.message });
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
