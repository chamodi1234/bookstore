const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  items: [
    {
      bagId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bag', required: true },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
