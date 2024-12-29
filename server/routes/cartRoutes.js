const express = require('express');
const {
  addItemToCart,
  deleteItemFromCart,
  getCart, 
  checkout
} = require('../controllers/cartController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();


router.get('/cart', authenticate, getCart);


router.post('/cart', authenticate, addItemToCart);


router.delete('/cart/:itemId', authenticate, deleteItemFromCart);


router.post('/checkout', authenticate, checkout); 


module.exports = router;
