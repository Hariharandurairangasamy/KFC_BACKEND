require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINERY_NAME,
  api_key: process.env.CLOUDINERY_KEY,
  api_secret: process.env.CLOUDINERY_SECRET,
});

export { cloudinary };
