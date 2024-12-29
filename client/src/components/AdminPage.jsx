import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BagDetails from './manage/BagDetails';
import StoreAnalysis from './manage/StoreAnalysis';

const AdminPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box sx={{ flexGrow: 1 }}>
        <Tabs 
          value={selectedTab} 
          onChange={handleTabChange} 
          centered 
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Bag Details" />
          <Tab label="Store Analysis" />
        </Tabs>

        {selectedTab === 0 && <BagDetails />}
        {selectedTab === 1 && <StoreAnalysis />}
      </Box>
      <Footer />
    </Box>
  );
};

export default AdminPage;
