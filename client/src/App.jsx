import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';

import Login from './components/Login';
import Register from './components/Register';
import Payment from './components/manage/Payment';
import ConfirmationPage from './components/manage/ConfirmationPage';
import UserPage from './components/UserPage';
import AdminPage from './components/AdminPage';



const App = () => {
  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<HomePage />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/admin" element={<AdminPage/>} />
        <Route path="/user/*" element={<UserPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="confirmation" element={<ConfirmationPage />} />

       


        
      </Routes>
    </Router>
  );
};

export default App;
