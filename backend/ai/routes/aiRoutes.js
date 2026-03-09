import express from "express";
import FutureEvent from "../models/FutureEvent.js";
import FutureCart from "../models/FutureCart.js";
import Product from "../../models/Product.js";
import User from "../../models/User.js";
import { generateFutureCart } from "../services/cartGenerator.js";
import { chatWithFutureSelf } from "../services/futureSelfChat.js";

const router = express.Router();


// 🔮 Get future events for a user
router.get("/future-events/:userId", async (req, res) => {
  try {

    const events = await FutureEvent.find({
      userId: req.params.userId
    });

    res.json(events);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch future events" });
  }
});


// 🛒 Generate AI Future Cart
router.post("/generate-cart/:eventId", async (req, res) => {
  try {

    const event = await FutureEvent.findById(req.params.eventId);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    const products = await Product.find().limit(20);

    const cartData = await generateFutureCart(event, products);

    const cart = await FutureCart.create({
      userId: event.userId,
      eventId: event._id,
      products: cartData.products,
      totalEstimatedPrice: cartData.totalEstimatedPrice,
      explanationFromFutureSelf: cartData.explanation
    });

    res.json(cart);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate future cart" });
  }
});


// 🤖 Chat with Future Self
router.post("/chat/:userId", async (req, res) => {
  try {

    const message = req.body.message;

    const user = await User.findById(req.params.userId);

    const reply = await chatWithFutureSelf(user, message);

    res.json({ reply });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Chat failed" });
  }
});

export default router;