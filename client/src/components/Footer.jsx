import React from 'react';
import { Box, Typography, Grid, IconButton, Divider } from '@mui/material';
import { Facebook, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "purple",
        color: "white",
        textAlign: "center",
        py: 5,
        mt: 4,
        px: { xs: 3, sm: 5 },
      }}
    >
      
      <Grid container spacing={4}>
        
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Discover Our Collection
          </Typography>
          <Typography variant="body2" fontSize={16} sx={{ opacity: 0.85 }}>
            Explore a variety of bags designed to suit every style and occasion. Find the perfect bag for your lifestyle...
          </Typography>
        </Grid>

        
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Get in Touch
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            <strong>Phone:</strong> +1 234 567 890
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            <strong>Address:</strong> 123 Bag Street, Colombo, Sri Lanka
          </Typography>
        </Grid>

        {/* Social Media Links */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <Box>
            <IconButton color="inherit" href="https://www.facebook.com" target="_blank" sx={{ mx: 1 }}>
              <Facebook sx={{ fontSize: 30 }} />
            </IconButton>
            <IconButton color="inherit" href="https://www.instagram.com" target="_blank" sx={{ mx: 1 }}>
              <Instagram sx={{ fontSize: 30 }} />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2, bgcolor: "white", opacity: 0.4 }} />

      {/* Footer Bottom */}
      <Typography variant="body2" sx={{ mt: 2, opacity: 0.7 }}>
        &copy; {new Date().getFullYear()} Bag Store. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
