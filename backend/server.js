import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();   
import { connectDB } from './config/db.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import Product from './models/Product.js';
import authRoutes from './routes/auth.js';
import wishlistRoutes from "./routes/wishlist.routes.js";
import cookieParser from 'cookie-parser';
import recommendRoutes from "./routes/recommend.routes.js";
import fetch from 'node-fetch';

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "https://e-commerce-steel-one.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());
// ✅ SIMPLE & CORRECT CORS (NO FUNCTIONS)
app.use(cookieParser());
// ✅ DB
connectDB();

// ✅ Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/recommend', recommendRoutes);
app.use("/api/wishlist", wishlistRoutes);

// ✅ Seed route
app.post('/api/seed', async (req, res) => {
  try {
    await Product.deleteMany();

    const response = await fetch('https://dummyjson.com/products?limit=50');
    const data = await response.json();

    const products = data.products.map(p => ({
      name: p.title,
      price: p.price,
      category: p.category,
      image: p.images[0],
      description: p.description,
      rating: p.rating || 4.0,
      stock: Math.floor(Math.random() * 50) + 10
    }));

    await Product.insertMany(products);

    res.json({ message: 'Database seeded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Render port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
