const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  image: String
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
