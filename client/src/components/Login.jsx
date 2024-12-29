import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Log the data being sent to the backend for debugging
    console.log({ email, password });

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data); // Log the backend response for debugging

      if (response.ok) {
        // Store token in localStorage and navigate to the appropriate page
        localStorage.setItem('authToken', data.token);

        if (email === 'admin@gmail.com') {
          navigate('/admin');
        } else {
          navigate('/user');
        }
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      alert('Error during login, please try again later.');
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
        backgroundImage: 'url("./assets/loginbg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Paper elevation={5} sx={{ padding: 4, borderRadius: 2, width: '100%', maxWidth: 400, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ color: 'purple', mb: 3 }}>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            sx={{ mb: 3 }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              bgcolor: 'purple',
              color: 'white',
              '&:hover': { bgcolor: 'darkpurple' },
              mb: 2,
            }}
          >
            Login
          </Button>
        </form>
        <Typography>
          Don't have an account?{' '}
          <Button component={Link} to="/register" variant="contained" fullWidth sx={{ bgcolor: 'purple', color: 'white' }}>
            Register
          </Button>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
