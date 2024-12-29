import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, CircularProgress, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ShopItem = () => {
  const { bagId } = useParams();  
  const [bag, setBag] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bagDetails, setBagDetails] = useState([]);

  useEffect(() => {
    console.log('Fetching data for bagId:', bagId);  

    
    const fetchBagDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/bags/${bagId}`);
        console.log('Bag Details Response:', response.data);  
        if (response.data) {
          setBag(response.data);  
        } else {
          console.log('No data found for this bagId');
        }
      } catch (error) {
        console.error('Error fetching bag details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    
    const fetchAllBags = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bags');
        console.log('All Bags:', response.data);  
        setBagDetails(response.data); 
      } catch (error) {
        console.error('Error fetching bags for the table:', error);
      }
    };

    fetchBagDetails();  
    fetchAllBags();  
  }, [bagId]);  

  
  if (isLoading) {
    return <CircularProgress />;
  }


  if (!bag) {
    return <Typography variant="h6">Bag not found</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', my: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {bag.title}
      </Typography>

      <Card sx={{ display: 'flex', flexDirection: 'row', mb: 4 }}>
        <CardMedia
          component="img"
          sx={{ width: 200 }}
          image={`http://localhost:5000/uploads/${bag.image}`}  
          alt={bag.title}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>{bag.description}</Typography>
          <Typography variant="body1">Available Bags: {bag.availableBags}</Typography>
          <Button variant="contained" color="primary">Add to Cart</Button>
        </CardContent>
      </Card>

     
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Available Bags</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bagDetails.map((bag) => (
              <TableRow key={bag._id}>
                <TableCell>{bag._id}</TableCell>
                <TableCell>{bag.title}</TableCell>
                <TableCell>{bag.description}</TableCell>
                <TableCell>{bag.availableBags}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ShopItem;
