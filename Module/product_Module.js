const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  stock: { type: String, enum: ['in-stock', 'out-of-stock'], required: true },
  actualPrice: { type: Number, required: true },
  discountPrice: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
  image: { type: Buffer, required: true }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
