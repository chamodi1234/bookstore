import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BagCard from './manage/BagCard'; // Ensure correct path for your BagCard
import axios from 'axios';

const HomePage = () => {
  const [latestBags, setLatestBags] = useState([]);

  useEffect(() => {
    const fetchLatestBags = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bags');
        setLatestBags(response.data);
      } catch (error) {
        console.error('Error fetching latest bags:', error);
      }
    };

    fetchLatestBags();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    ],
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Header />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '50vh',
          background: 'linear-gradient(to right, rgb(205, 132, 188), rgb(220, 194, 215))',
          color: 'white',
          textAlign: 'center',
          p: 3,
        }}
      >
        <Typography variant="h3" color="black" gutterBottom sx={{ fontWeight: 'bold' }}>
          Welcome to Your Perfect Bag Shop!
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: '300' }} color="black">
          <span style={{ fontWeight: 'bold' }}>New to our store?</span> Join us today and discover the
          perfect bag that suits your style and needs!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/register"
          sx={{
            bgcolor: 'purple',
            color: 'white',
            mt: 2,
            borderRadius: 3,
            '&:hover': { bgcolor: '#6a2c8b' },
          }}
        >
          Register Now and Start Shopping
        </Button>
      </Box>
      <Box sx={{ p: 3, flexGrow: 1 }}>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ fontWeight: 'bold', color: 'purple', mb: 4 }}
        >
          Latest Bags
        </Typography>
        <Slider {...sliderSettings}>
          {latestBags.map((bag) => (
            <div
              key={bag._id}
              style={{
                padding: '20px',
                marginBottom: '10px',
                width: '200px',
                height: '300px',
                marginRight: '30px', 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
                borderRadius: '12px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                transition: 'box-shadow 0.2s ease',
              }}
            >
              <BagCard bag={bag} showAddToCart={false} />
            </div>
          ))}
        </Slider>
      </Box>
      <Box sx={{ marginTop: 'auto' }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default HomePage;
