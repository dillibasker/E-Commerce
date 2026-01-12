import express from "express";
import Wishlist from "../models/Wishlist.js";
import User from "../models/User.js";

const router = express.Router();

/* ➕ Add / Remove Wishlist */
router.post("/toggle", async (req, res) => {
  try {
    const token = req.cookies.sessionToken;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // 🔐 Get logged-in user from cookie
    const user = await User.findOne({ sessionToken: token });
    if (!user) {
      return res.status(401).json({ message: "Invalid session" });
    }

    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: "ProductId missing" });
    }

    const exists = await Wishlist.findOne({
      userId: user._id,
      productId
    });

    if (exists) {
      await Wishlist.deleteOne({ _id: exists._id });
      return res.json({ wishlisted: false });
    }

    await Wishlist.create({
      userId: user._id,   // ✅ FIX
      productId
    });

    res.json({ wishlisted: true });

  } catch (err) {
    console.error("Wishlist toggle error:", err);
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
