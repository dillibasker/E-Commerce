import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import Product from './models/Product.js';
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';


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

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);


app.post('/api/seed', async (req, res) => {
  try {
    await Product.deleteMany();
    const sampleProducts = [
      { name: 'Wireless Headphones', price: 2999, category: 'Electronics', image: 'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg', description: 'Premium wireless headphones', rating: 4.5, stock: 25 },
      { name: 'Smart Watch', price: 5999, category: 'Electronics', image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg', description: 'Fitness tracking smartwatch', rating: 4.3, stock: 15 },
      { name: 'Laptop Backpack', price: 1499, category: 'Accessories', image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg', description: 'Durable laptop backpack', rating: 4.7, stock: 30 },
      { name: 'Bluetooth Speaker', price: 3499, category: 'Electronics', image: 'https://images.pexels.com/photos/1279088/pexels-photo-1279088.jpeg', description: 'Portable bluetooth speaker', rating: 4.4, stock: 20 },
      { name: 'Gaming Mouse', price: 1999, category: 'Electronics', image: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg', description: 'RGB gaming mouse', rating: 4.6, stock: 40 },
      { name: 'Phone Case', price: 499, category: 'Accessories', image: 'https://images.pexels.com/photos/5598290/pexels-photo-5598290.jpeg', description: 'Protective phone case', rating: 4.2, stock: 50 },
      { name: 'Wireless Charger', price: 899, category: 'Electronics', image: 'https://images.pexels.com/photos/4790268/pexels-photo-4790268.jpeg', description: 'Fast wireless charger', rating: 4.5, stock: 35 },
      { name: 'USB-C Cable', price: 299, category: 'Accessories', image: 'https://images.pexels.com/photos/4219861/pexels-photo-4219861.jpeg', description: 'Durable USB-C cable', rating: 4.3, stock: 60 }
    ];
    await Product.insertMany(sampleProducts);
    res.json({ message: 'Database seeded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
