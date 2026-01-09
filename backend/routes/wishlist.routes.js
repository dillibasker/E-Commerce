import express from "express";
import Wishlist from "../models/Wishlist.js";

const router = express.Router();

/* ➕ Add / Remove Wishlist */
router.post("/toggle", async (req, res) => {
  const { userId, productId } = req.body;

  const exists = await Wishlist.findOne({ userId, productId });

  if (exists) {
    await Wishlist.deleteOne({ userId, productId });
    return res.json({ wishlisted: false });
  }

  await Wishlist.create({ userId, productId });
  res.json({ wishlisted: true });
});

/* 📦 Get Wishlist */
router.get("/:userId", async (req, res) => {
  const wishlist = await Wishlist.find({ userId })
    .populate("productId");

  res.json(wishlist);
});

/* 🔢 Wishlist Count */
router.get("/count/:userId", async (req, res) => {
  const count = await Wishlist.countDocuments({ userId });
  res.json({ count });
});

export default router;
