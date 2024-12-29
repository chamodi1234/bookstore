import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert } from '@mui/material';
import { Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        console.log('User registered:', data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: '#f5f5f5',
        padding: 2,
        backgroundImage: 'url("./assets/registerbg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Paper elevation={5} sx={{ padding: 4, borderRadius: 2, width: '100%', maxWidth: 400, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ color: 'purple', mb: 3 }}>Register</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleRegister}>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth required sx={{ mb: 2 }} />
          <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required sx={{ mb: 2 }} />
          <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth required sx={{ mb: 2 }} />
          <TextField label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} fullWidth required sx={{ mb: 3 }} />
          <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: 'purple', color: 'white', '&:hover': { bgcolor: 'darkpurple' }, mb: 2 }}>Register</Button>
        </form>
        <Typography sx={{ mt: 2, mb: 1 }}>Already have an account?</Typography>
        <Button component={Link} to="/login" variant="contained" fullWidth sx={{ bgcolor: 'purple', color: 'white', '&:hover': { bgcolor: 'darkpurple' } }}>Login</Button>
      </Paper>
    </Box>
  );
};

export default Register;
