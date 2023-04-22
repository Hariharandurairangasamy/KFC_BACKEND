import mongoose from 'mongoose';

const orders = new mongoose.Schema(
  {
    productId: {
      type: String,
      require: true,
    },
    productName: {
      type: String,
      require: true,
    },
    ProductImage: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
    qty: {
      type: String,
      require: true,
    },
    total: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    status: { type: String, default: 'pending' },
  },
  { timestamps: true }
);
export default mongoose.model('orders', orders);
