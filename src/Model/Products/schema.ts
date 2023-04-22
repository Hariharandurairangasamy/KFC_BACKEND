import mongoose from 'mongoose';
import { Products } from 'Interface/UserInterface';

const product = new mongoose.Schema(
  {
    productName: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    offer: {
      type: String,
      require: true,
    },
    rating: {
      tyrpe: Number,
    },
    productImage: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model<Products>('product', product);
