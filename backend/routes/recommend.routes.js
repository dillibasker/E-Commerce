import express from "express";
import Product from "../models/Product.js";
import { getRecommendations } from "../ai/recommender.js";

const router = express.Router();

router.get("/:productId", async (req, res) => {
  try {
    const products = await Product.find();
    const recommendations = getRecommendations(
      products,
      req.params.productId
    );

    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ error: "Recommendation failed" });
  }
});

export default router;
