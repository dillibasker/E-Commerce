import express from "express";
import FutureEvent from "../models/FutureEvent.js";
import FutureCart from "../models/FutureCart.js";
import Product from "../../models/Product.js";
import { generateFutureCart } from "../services/cartGenerator.js";
import { chatWithFutureSelf } from "../services/futureSelfChat.js";

const router = express.Router();

router.get("/future-events/:userId", async (req, res) => {
  const events = await FutureEvent.find({ userId: req.params.userId });
  res.json(events);
});

router.post("/generate-cart/:eventId", async (req, res) => {
  const event = await FutureEvent.findById(req.params.eventId);
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
});

router.post("/chat/:userId", async (req, res) => {
  const message = req.body.message;
  const user = await User.findById(req.params.userId);

  const reply = await chatWithFutureSelf(user, message);

  res.json({ reply });
});

export default router;