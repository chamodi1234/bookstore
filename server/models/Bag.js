const mongoose = require('mongoose');

const bagSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    availableBags: { type: Number, required: true },
    Number: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    image: { type: String },
  },
  { timestamps: true } 
);

const Bag = mongoose.model('Bag', bagSchema);
module.exports = Bag;
