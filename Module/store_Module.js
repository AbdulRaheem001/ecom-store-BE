const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  Email:{ type: String, required: [true, "Please Add Your Email"] },
  Store_name: { type: String, required: true },
  Owner_name: { type: String, required: true },
  Status: { type: Boolean, required: true },
  image: { type: Buffer, required: true }
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
