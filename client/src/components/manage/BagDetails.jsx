import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const BagDetails = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [availableBags, setAvailableBags] = useState(0);
  const [Number, setNumber] = useState('');
  const [price, setPrice] = useState(''); 
  const [bagDetails, setBagDetails] = useState([]);
  const [viewTable, setViewTable] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', severity: '' });
  const [editingBagId, setEditingBagId] = useState(null);

  const apiUrl = 'http://localhost:5000/api/bags';

  const fetchBags = async () => {
    try {
      const response = await axios.get(apiUrl);
      setBagDetails(response.data);
    } catch (err) {
      console.error('Error fetching bags:', err);
    }
  };

  const fetchBagDetails = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/${id}`);
      const bag = response.data;
      setTitle(bag.title);
      setDescription(bag.description);
      setAvailableBags(bag.availableBags);
      setNumber(bag.Number);
      setPrice(bag.price); 
      setImageUrl(bag.imageUrl);
      setEditingBagId(bag._id);
    } catch (err) {
      console.error('Error fetching bag details:', err);
    }
  };

  useEffect(() => {
    fetchBags();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);

    
    setImageUrl(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImageUrl('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('availableBags', availableBags);
    formData.append('Number', Number);
    formData.append('price', price); 
    if (image) {
      formData.append('image', image);
    }

    try {
      if (editingBagId) {
        await axios.put(`${apiUrl}/${editingBagId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setFeedback({ message: 'Bag updated successfully!', severity: 'success' });
        setEditingBagId(null);
      } else {
        await axios.post(apiUrl, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setFeedback({ message: 'Bag added successfully!', severity: 'success' });
      }
      fetchBags();
      setTitle('');
      setDescription('');
      setImage(null);
      setImageUrl('');
      setAvailableBags(0);
      setNumber('');
      setPrice('');
    } catch (err) {
      console.error('Error submitting bag:', err);
      setFeedback({ message: 'Error submitting bag.', severity: 'error' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setFeedback({ message: 'Bag deleted successfully!', severity: 'success' });
      fetchBags();
    } catch (err) {
      console.error('Error deleting bag:', err);
      setFeedback({ message: 'Error deleting bag.', severity: 'error' });
    }
  };

  const handleEdit = (id) => {
    fetchBagDetails(id);
  };

  const handleCloseFeedback = () => {
    setFeedback({ message: '', severity: '' });
  };

  return (
    <Box
    sx={{
      maxWidth: 1000,  
      mx: 'auto',
      my: 2, 
      p: 4,  
      bgcolor: '#f9f9f9',
      borderRadius: 2,
      boxShadow: 3,
      }}
    >
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', color: 'purple' }}>
        {editingBagId ? 'Edit Bag Details' : 'Add Bag Details'}
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Number"
          value={Number}
          onChange={(e) => setNumber(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Available Bags"
          type="number"
          value={availableBags}
          onChange={(e) => setAvailableBags(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          component="label"
          sx={{ bgcolor: 'purple', color: 'white', mb: 2, '&:hover': { bgcolor: 'darkpurple' } }}
        >
          Upload Image
          <input type="file" hidden onChange={handleImageUpload} />
        </Button>
        {(imageUrl || image) && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <img
              src={imageUrl || (image ? URL.createObjectURL(image) : '')}
              alt="Uploaded bag"
              style={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'cover', marginRight: '16px' }}
            />
            <IconButton onClick={handleRemoveImage} sx={{ color: 'red' }}>
              <CloseIcon />
            </IconButton>
          </Box>
        )}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ bgcolor: 'purple', color: 'white', '&:hover': { bgcolor: 'darkpurple' } }}
        >
          {editingBagId ? 'Update' : 'Add'}
        </Button>
      </Box>

      <Button
        variant="outlined"
        sx={{ mt: 4, mb: 2, color: 'purple', borderColor: 'purple' }}
        onClick={() => setViewTable(!viewTable)}
      >
        {viewTable ? 'Hide' : 'View'} Bags
      </Button>

      {viewTable && (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Number</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Available Bags</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bagDetails.map((bag) => (
                <TableRow key={bag._id}>
                  <TableCell>{bag.Number}</TableCell>
                  <TableCell>{bag.title}</TableCell>
                  <TableCell>{bag.description}</TableCell>
                  <TableCell>{bag.price}</TableCell>
                  <TableCell>{bag.availableBags}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mr: 1 }}
                      onClick={() => handleEdit(bag._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(bag._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {feedback.message && (
        <Snackbar
          open={true}
          autoHideDuration={3000}
          onClose={handleCloseFeedback}
        >
          <Alert onClose={handleCloseFeedback} severity={feedback.severity}>
            {feedback.message}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default BagDetails;
