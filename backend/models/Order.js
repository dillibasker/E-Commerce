import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      name: String,
      price: Number,
      quantity: Number
    }
  ],

  total: {
    type: Number,
    required: true
  },

  address: {
    type: String,
    required: true
  },

  status: {
    type: String,
    default: 'pending'
  }

}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
