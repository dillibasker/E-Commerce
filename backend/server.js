import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import Product from './models/Product.js';
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';
import recommendRoutes from "./routes/recommend.routes.js";
import fetch from 'node-fetch'; // or global fetch if Node v18+



dotenv.config();

const app = express();
const allowedOrigins = ['http://localhost:5173'];
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

connectDB();
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/recommend", recommendRoutes);

app.post('/api/seed', async (req, res) => {
  try {
    // Clear existing products
    await Product.deleteMany();

    // Fetch 50 products from DummyJSON
    const response = await fetch('https://dummyjson.com/products?limit=50');
    const data = await response.json();
    const products = data.products.map(p => ({
      name: p.title,
      price: p.price,
      category: p.category,
      image: p.images[0],       // first image
      description: p.description,
      rating: p.rating || 4.0,
      stock: Math.floor(Math.random() * 50) + 10  // random stock
    }));
    console.log('Total products from API:', data.total);
console.log('Products received:', data.products.length);

    // Insert products into DB
    await Product.insertMany(products);

    res.json({ message: 'Database seeded successfully with DummyJSON products' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
