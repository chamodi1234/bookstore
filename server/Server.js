const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); 
const authRoutes = require('./routes/authRoutes');
const bagRoutes = require('./routes/bagRoutes');
const cartRoutes = require('./routes/cartRoutes'); 

const soldItemRoutes = require('./routes/soldItemRoutes'); 










dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());


mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/bags', bagRoutes);
app.use('/api', cartRoutes);

app.use('/api/soldItem', soldItemRoutes);









app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
