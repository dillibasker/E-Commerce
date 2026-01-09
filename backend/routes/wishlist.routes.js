import express from "express";
import Wishlist from "../models/Wishlist.js";

const router = express.Router();

/* ➕ Add / Remove Wishlist */
router.post("/toggle", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const exists = await Wishlist.findOne({ userId, productId });

    if (exists) {
      await Wishlist.deleteOne({ userId, productId });
      return res.json({ wishlisted: false });
    }

    await Wishlist.create({ userId, productId });
    res.json({ wishlisted: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


/* 📦 Get Wishlist */
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ error: "UserId missing" });

    const wishlist = await Wishlist.find({ userId }).populate("productId");
    res.json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});



/* 🔢 Wishlist Count */
router.get("/count/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const count = await Wishlist.countDocuments({ userId });
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


export default router;
