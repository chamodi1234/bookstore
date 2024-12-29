import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Grid,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCcVisa, FaCcMastercard } from 'react-icons/fa';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { totalPrice = 0, cartItems = [] } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState('CashOnDelivery');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cvv: '',
    expiration: '',
    cardType: '',
  });
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    address: '',
    phone: '',
  });

  const deliveryFee = 300;
  const finalTotalPrice = totalPrice + deliveryFee;

  const handlePaymentMethodChange = (event) => setPaymentMethod(event.target.value);

  const handleInputChange = (event, setState) => {
    const { name, value } = event.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = () => {
    if (!customerDetails.name || !customerDetails.address || !customerDetails.phone) {
      alert('Please fill in all customer details.');
      return;
    }

    if (
      paymentMethod === 'CardPayment' &&
      (!cardDetails.cardNumber || !cardDetails.cvv || !cardDetails.expiration || !cardDetails.cardType)
    ) {
      alert('Please fill in all card details.');
      return;
    }

    alert(`Payment successful via ${paymentMethod}!`);
    navigate('/confirmation');
  };

  const handleBack = () => navigate(-1);

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: '#f3e5f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper sx={{ padding: 4, width: '100%', maxWidth: 600, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', color: '#7b1fa2', mb: 3 }}>
          Payment
        </Typography>

        {cartItems.length > 0 ? (
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6}>
              <Typography variant="h6">Cart Total:</Typography>
              <Typography variant="h6">Delivery Fee:</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Total Price:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Rs.{totalPrice}</Typography>
              <Typography variant="h6">Rs.{deliveryFee}</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Rs.{finalTotalPrice}
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <Typography color="error" sx={{ textAlign: 'center', mb: 3 }}>
            No items found in your cart. Please go back and add items.
          </Typography>
        )}

        <TextField
          label="Your Name"
          fullWidth
          margin="normal"
          variant="outlined"
          name="name"
          value={customerDetails.name}
          onChange={(e) => handleInputChange(e, setCustomerDetails)}
        />
        <TextField
          label="Your Address"
          fullWidth
          margin="normal"
          variant="outlined"
          name="address"
          value={customerDetails.address}
          onChange={(e) => handleInputChange(e, setCustomerDetails)}
        />
        <TextField
          label="Phone Number"
          fullWidth
          margin="normal"
          variant="outlined"
          name="phone"
          value={customerDetails.phone}
          onChange={(e) => handleInputChange(e, setCustomerDetails)}
        />

        <RadioGroup value={paymentMethod} onChange={handlePaymentMethodChange} sx={{ mb: 2 }}>
          <FormControlLabel value="CashOnDelivery" control={<Radio color="secondary" />} label="Cash on Delivery" />
          <FormControlLabel value="CardPayment" control={<Radio color="secondary" />} label="Card Payment" />
        </RadioGroup>

        {paymentMethod === 'CardPayment' && (
          <>
            <FormControl fullWidth margin="normal">
              <InputLabel>Card Type</InputLabel>
              <Select
                name="cardType"
                value={cardDetails.cardType}
                onChange={(e) => handleInputChange(e, setCardDetails)}
                label="Card Type"
              >
                <MenuItem value="Visa">
                  <FaCcVisa style={{ marginRight: 8 }} />
                  Visa
                </MenuItem>
                <MenuItem value="MasterCard">
                  <FaCcMastercard style={{ marginRight: 8 }} />
                  MasterCard
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Card Number"
              fullWidth
              margin="normal"
              variant="outlined"
              name="cardNumber"
              value={cardDetails.cardNumber}
              onChange={(e) => handleInputChange(e, setCardDetails)}
            />
            <TextField
              label="Expiration Date (MM/YY)"
              fullWidth
              margin="normal"
              variant="outlined"
              name="expiration"
              value={cardDetails.expiration}
              onChange={(e) => handleInputChange(e, setCardDetails)}
            />
            <TextField
              label="CVV"
              fullWidth
              margin="normal"
              variant="outlined"
              name="cvv"
              value={cardDetails.cvv}
              onChange={(e) => handleInputChange(e, setCardDetails)}
            />
          </>
        )}

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3, backgroundColor: '#7b1fa2', '&:hover': { backgroundColor: '#ab47bc' } }}
          onClick={handlePayment}
        >
          {paymentMethod === 'CashOnDelivery' ? 'Place Order' : 'Pay Now'}
        </Button>

        <Button
          variant="outlined"
          fullWidth
          sx={{ mt: 2, color: '#7b1fa2', borderColor: '#7b1fa2', '&:hover': { borderColor: '#ab47bc' } }}
          onClick={handleBack}
        >
          Back
        </Button>
      </Paper>
    </Box>
  );
};

export default PaymentPage;
