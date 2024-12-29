import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ConfirmationPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        textAlign: 'center',
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'light purple',
      }}
    >
      <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
        Thank You for Your Purchase! 
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Your order has been placed successfully and will be delivered soon.
      </Typography>
      <Button
        variant="contained"
        color="white"
        onClick={() => navigate('/user')}
        sx={{
            color:'white',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: 'purple',
          '&:hover': { backgroundColor: 'light purple' },
        }}
      >
        Back
      </Button>
    </Box>
  );
};

export default ConfirmationPage;
