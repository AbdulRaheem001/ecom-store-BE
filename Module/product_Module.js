const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  stock: { type: String, required: true },
  actualPrice: { type: Number, required: true },
  discountPrice: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
  catagory: {type: String, required:true},
  storeName: {type: String, required:true},
  image: { type: Buffer, required: true }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
