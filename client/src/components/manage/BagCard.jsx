import React from 'react';
import { Card, CardContent, CardMedia, CardActions, Button, Typography, Box } from '@mui/material';
import axios from 'axios';

const BagCard = ({ bag, onAddToCart, showAddToCart = true }) => {
  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('User is not authenticated. Please log in.');
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/cart',
        {
          item: {
            bagId: bag._id,
            quantity: 1,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newCart = JSON.parse(localStorage.getItem('cart') || '[]');
      newCart.push({ ...bag, quantity: 1 });
      localStorage.setItem('cart', JSON.stringify(newCart));

      
      const updatedBag = { ...bag, availableBags: bag.availableBags - 1 };
      onAddToCart(updatedBag);

      console.log('Item added successfully:', response.data);
      alert('Item added to cart!');
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 401) {
          alert('Authentication failed. Please log in again.');
        } else if (status === 404) {
          alert('Bag not found. Please try again.');
        } else {
          alert(data.error || 'An error occurred. Please try again.');
        }
      } else {
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred. Please check your connection and try again.');
      }
    }
  };

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', boxShadow: 3 }}>
      <Box sx={{ height: 300, backgroundColor: '#f9f9f9', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CardMedia
          component="img"
          alt={bag.title}
          src={bag.imageUrl || '/placeholder.jpg'}
          sx={{ maxHeight: 200, objectFit: 'contain' }}
        />
      </Box>
      <CardContent>
  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
    <Typography variant="h6" fontWeight={"bold"}>
      {bag.title}
    </Typography>
  </Box>
  <Typography variant="body2" sx={{ mb: 1 }}>
    {bag.description}
  </Typography>
  <Typography variant="body2" sx={{ mb: 1 }}>
    Available Bags: <strong>{bag.availableBags}</strong>
  </Typography>
  <Typography variant="body2" sx={{ mb: 1 }}>
    Price: <strong>Rs.{bag.price}</strong>
  </Typography>
  {bag.availableBags === 0 && (
    <Typography variant="body2" color="error">Out of Stock</Typography>
  )}
</CardContent>


      {showAddToCart && (
        <CardActions>
          <Button
            variant="contained"
            onClick={handleAddToCart}
            sx={{ backgroundColor: 'purple', '&:hover': { backgroundColor: 'darkpurple' } }}
            disabled={bag.availableBags === 0}
          >
            Add to Cart
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default BagCard;
