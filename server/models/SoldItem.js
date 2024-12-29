const mongoose = require('mongoose');

const soldItemSchema = new mongoose.Schema({
  bagId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bag', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  userId: { type: String, required: true },
  dateSold: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SoldItem', soldItemSchema);
