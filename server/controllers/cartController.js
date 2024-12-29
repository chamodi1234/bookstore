const Cart = require('../models/Cart');
const Bag = require('../models/Bag');
const SoldItem = require('../models/SoldItem');


const addItemToCart = async (req, res) => {
  const { bagId, quantity } = req.body.item;
  const email = req.user?.email;

  if (!email) {
    return res.status(401).json({ error: 'Unauthorized. User email not found.' });
  }

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ error: 'Invalid quantity' });
  }

  try {
    const bag = await Bag.findById(bagId);
    if (!bag) {
      return res.status(404).json({ error: 'Bag not found' });
    }

    if (bag.availableBags < quantity) {
      return res.status(400).json({ error: 'Not enough bags available' });
    }

    
    bag.availableBags -= quantity;
    await bag.save();

    let cart = await Cart.findOne({ email });
    if (!cart) {
      cart = new Cart({ email, items: [] });
    }

    
    const existingItem = cart.items.find(item => item.bagId.toString() === bagId);
    if (existingItem) {
     
      existingItem.quantity += quantity;
    } else {
     
      cart.items.push({ bagId, quantity });
    }

    await cart.save();
    //res.status(200).json({ message: 'Item added to cart successfully', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add item to cart', message: error.message });
  }
};


const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

   
    const cart = await Cart.findOne({ email: req.user.email }).populate('items.bagId'); 
    if (!cart || cart.items.length === 0) {
      return res.status(200).json({ items: [], totalPrice: 0 });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


const deleteItemFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { itemId } = req.params;

 
    const cart = await Cart.findOne({ email: req.user.email });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

   
    const itemIndex = cart.items.findIndex(item => item.bagId.toString() === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    
    const bag = await Bag.findById(cart.items[itemIndex].bagId);
    if (!bag) {
      return res.status(404).json({ error: 'Bag not found' });
    }

  
    bag.availableBags += cart.items[itemIndex].quantity;
    await bag.save();

    
    cart.items.splice(itemIndex, 1);
    await cart.save();

    //res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};



const checkout = async (req, res) => {
  try {
    const { cartItems } = req.body; 
    const email = req.user?.email; 

    if (!email) {
      return res.status(401).json({ message: 'Unauthorized: User email is missing' });
    }

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart items are required for checkout' });
    }

    
    const soldItems = cartItems.map((item) => ({
      bagId: item.bagId._id,
      quantity: item.quantity,
      price: item.bagId.price,
      userId: email,
    }));

    
    await SoldItem.insertMany(soldItems);

    
    await Cart.findOneAndUpdate({ email }, { items: [] });

    res.status(200).json({ message: 'Checkout successful!' });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};



module.exports = { addItemToCart, deleteItemFromCart, getCart, checkout };
