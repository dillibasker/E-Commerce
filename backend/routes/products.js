import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// GET all products with filters, search, and sorting
// Example: /api/products?category=Electronics&minPrice=500&maxPrice=5000&rating=4&sort=priceAsc&search=phone
router.get('/', async (req, res) => {
  try {
    const { category, minPrice, maxPrice, rating, sort, search } = req.query;
    let filter = {};

    // Category filter
    if (category && category !== "All") filter.category = category;

    // Price filter
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);

    // Rating filter
    if (rating) filter.rating = { $gte: Number(rating) };

    // Search by name
    if (search) filter.name = { $regex: search, $options: "i" };

    // Query with filters
    let productsQuery = Product.find(filter);

    // Sorting
    if (sort === "priceAsc") productsQuery = productsQuery.sort({ price: 1 });
    if (sort === "priceDesc") productsQuery = productsQuery.sort({ price: -1 });
    if (sort === "rating") productsQuery = productsQuery.sort({ rating: -1 });

    const products = await productsQuery;
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET all unique categories
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
