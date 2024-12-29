import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BagCard from './manage/BagCard';
import Cart from './manage/Cart';

const UserPage = () => {
  const { bagId } = useParams();
  const [bag, setBag] = useState(null);
  const [bagDetails, setBagDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [greeting, setGreeting] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    const fetchBagDetails = async () => {
      if (bagId) {
        try {
          const response = await axios.get(`http://localhost:5000/api/bags/${bagId}`);
          setBag(response.data);
        } catch (error) {
          console.error('Error fetching bag details:', error);
        }
      }
    };

    const fetchAllBags = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bags');
        setBagDetails(response.data);
      } catch (error) {
        console.error('Error fetching bags:', error);
      }
    };

    fetchBagDetails();
    fetchAllBags();
    setIsLoading(false);
  }, [bagId]);

  const handleAddToCart = (bag) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === bag._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === bag._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...bag, quantity: 1 }];
    });
  };

  if (isLoading) {
    return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header onCartClick={() => setIsCartOpen(true)} />
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          Hello, {greeting}! Welcome to our Bag Store !
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Grid container spacing={4}>
          {bagDetails.map((bag) => (
            <Grid item xs={12} sm={6} md={4} key={bag._id}>
              <BagCard bag={bag} onAddToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Cart cart={cart} isOpen={isCartOpen} onClose={setIsCartOpen} />
      <Footer />
    </Box>
  );
};

export default UserPage;
