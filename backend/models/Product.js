import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: String,
  description: String,
  rating: { type: Number, default: 4 },
  stock: { type: Number, default: 10 }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
