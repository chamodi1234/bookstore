import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Text } from 'recharts';
import axios from 'axios';

const StoreAnalysis = () => {
  const [bagData, setBagData] = useState([]);
  const [soldData, setSoldData] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalCheckouts, setTotalCheckouts] = useState(0); 
  const [bagEarnings, setBagEarnings] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/bags') 
      .then((response) => {
        const bagChartData = response.data.map((bag) => ({
          name: bag.title,
          availableBags: bag.availableBags,
          soldBags: bag.soldBags,
          price: bag.price,
        }));
        setBagData(bagChartData);
      })
      .catch((error) => {
        console.error('Error fetching bag data:', error);
      });

    axios
      .get('http://localhost:5000/api/soldItem')
      .then((response) => {
        const soldChartData = response.data.map((item) => ({
          name: item.bagId.title,
          soldBags: item.quantity,
          price: item.bagId.price,
        }));

        const aggregatedSoldData = soldChartData.reduce((acc, curr) => {
          const existingBag = acc.find((entry) => entry.name === curr.name);
          if (existingBag) {
            existingBag.soldBags += curr.soldBags;
          } else {
            acc.push(curr);
          }
          return acc;
        }, []);

        setSoldData(aggregatedSoldData);

        const totalCheckouts = aggregatedSoldData.reduce((count, item) => count + item.soldBags, 0); // Total checkouts
        setTotalCheckouts(totalCheckouts);

        const earnings = aggregatedSoldData.reduce((total, item) => {
          const itemEarnings = item.soldBags * item.price;
          return total + itemEarnings;
        }, 0);

        setTotalEarnings(earnings);

        const earningsByBag = aggregatedSoldData.map(item => ({
          name: item.name,
          soldBags: item.soldBags,
          total: item.soldBags * item.price,
        }));
        setBagEarnings(earningsByBag);
      })
      .catch((error) => {
        console.error('Error fetching sold data:', error);
      });
  }, []);

  const renderCustomLabel = (props) => {
    const { x, y, value } = props;
    if (value === 0) {
      return (
        <Text
          x={x + 100}
          y={y - 100}
          fontSize="20px"
          fontWeight="bold"
          fill="#ff4d4f"
          textAnchor="middle"
        >
          SOLD OUT
        </Text>
      );
    }
    return null;
  };

  const filteredSoldData = soldData.filter(item => item.soldBags > 0);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Store Analysis
      </Typography>

      {/* Available Items Chart */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Total Items Chart (Bag Names and Availability)
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bagData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="availableBags" label={renderCustomLabel}>
                {bagData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.availableBags === 0 ? '#ff4d4f' : '#82ca9d'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Sold Items Chart */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Sold Items Chart (Bag Names and Sold Amount)
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredSoldData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="soldBags">
                {filteredSoldData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.soldBags === 0 ? '#ff4d4f' : '#8884d8'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StoreAnalysis;
