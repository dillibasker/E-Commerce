import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    quantity: Number
  }],
  total: Number,
  customerName: String,
  customerEmail: String,
  customerPhone: {
  type: String,
  required: true
},

  address: String,
  status: { type: String, default: 'pending' }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
