import mongoose from 'mongoose';

const store = new mongoose.Schema(
  {
    storeId: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    state: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    lat: {
      type: String,
      require: true,
    },
    long: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('store', store);
