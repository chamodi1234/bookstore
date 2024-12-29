import React, { useEffect, useState } from 'react';
import { Drawer, Box, Typography, Grid, Card, CardContent, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = ({ isOpen, onClose }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          alert('User is not authenticated. Please log in.');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.items && response.data.items.length > 0) {
          setCart(response.data.items);
          const calculatedTotal = response.data.items.reduce(
            (sum, item) => sum + item.bagId.price * item.quantity,
            0
          );
          setTotalPrice(calculatedTotal);
        } else {
          setCart([]);
          setTotalPrice(0); 
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
        alert('Failed to load cart');
      }
    };

    if (isOpen) {
      fetchCart();
    }
  }, [isOpen]);

  const handleRemoveItem = async (bagId) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('User is not authenticated. Please log in.');
        return;
      }

      const response = await axios.delete(`http://localhost:5000/api/cart/${bagId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart((prevCart) => prevCart.filter((item) => item.bagId._id !== bagId));
      alert(response.data.message);
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item');
    }
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty. Please add items to your cart before proceeding.');
      return;
    }
  
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('User is not authenticated. Please log in.');
        return;
      }
  
      const userId = localStorage.getItem('userId');
      const response = await axios.post(
        'http://localhost:5000/api/checkout',
        {
          userId,
          cartItems: cart,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      
      const currentCart = cart;
      const currentTotalPrice = totalPrice;
  
      setCart([]);
      setTotalPrice(0);
  
    
      navigate('/payment', {
        state: {
          totalPrice: currentTotalPrice,
          cartItems: currentCart,
        },
      });
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Failed to complete checkout');
    }
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={() => onClose(false)}>
      <Box sx={{ width: 350, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Your Cart</Typography>
          <IconButton onClick={() => onClose(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Grid container spacing={2}>
          {cart.length > 0 ? (
            cart.map((item) => (
              <Grid item xs={12} key={item.bagId._id}>
                <Card sx={{ display: 'flex', flexDirection: 'column', boxShadow: 3, mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6">{item.bagId.title}</Typography>
                    <Typography variant="body2">Price: Rs.{item.bagId.price * item.quantity}</Typography>
                    <Typography variant="body2">Quantity: {item.quantity}</Typography>
                  </CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                    <IconButton onClick={() => handleRemoveItem(item.bagId._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="body2">Your cart is empty.</Typography>
            </Grid>
          )}
        </Grid>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Total: Rs.{totalPrice}
          </Typography>
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: 'purple',
              '&:hover': { backgroundColor: 'darkpurple' },
            }}
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Cart;
