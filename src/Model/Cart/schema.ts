import mongoose from 'mongoose';

const cart = new mongoose.Schema(
  {
    productId: {
      type: String,
      require: true,
    },
    productName: {
      type: String,
      require: true,
    },
    productImage: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
    qty: {
      type: Number,
      require: true,
    },
    total: {
      type: Number,
      require: true,
    },
    cloudineryId: { type: String, require: true },
  },
  { timestamps: true }
);

export default mongoose.model('cart', cart);
