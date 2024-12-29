const Bag = require('../models/Bag');
const fs = require('fs');
const path = require('path');


exports.addBag = async (req, res) => {
  try {
    const { title, description, availableBags, Number, price } = req.body;

    if (!title || !description || !availableBags || !Number || !price) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const parsedAvailableBags = parseInt(availableBags, 10);
    const parsedPrice = parseFloat(price);

    const existingBag = await Bag.findOne({ Number });
    if (existingBag) {
      return res.status(400).json({ error: 'Bag with this number already exists' });
    }

    const image = req.file ? `/uploads/${req.file.filename}` : '';
    const newBag = new Bag({
      title,
      description,
      availableBags: parsedAvailableBags,
      Number,
      price: parsedPrice,
      image,
    });

    await newBag.save();
    res.status(201).json(newBag);
  } catch (error) {
    console.error('Error in addBag:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getBags = async (req, res) => {
  try {
    const bags = await Bag.find();
    const bagsWithUrls = bags.map((bag) => ({
      ...bag.toObject(),
      imageUrl: bag.image ? `http://localhost:5000${bag.image}` : 'https://via.placeholder.com/150',
    }));
    res.json(bagsWithUrls);
  } catch (err) {
    console.error('Error in getBags:', err);
    res.status(500).json({ error: err.message });
  }
};


exports.getBagById = async (req, res) => {
  try {
    const bag = await Bag.findById(req.params.id);
    if (!bag) {
      return res.status(404).json({ error: 'Bag not found' });
    }
    const imageUrl = bag.image ? `http://localhost:5000${bag.image}` : 'https://via.placeholder.com/150';
    res.json({ ...bag.toObject(), imageUrl });
  } catch (err) {
    console.error('Error fetching bag:', err);
    res.status(500).json({ error: err.message });
  }
};


exports.updateBag = async (req, res) => {
  try {
    const { title, description, availableBags, Number, price } = req.body;
    const newImage = req.file ? `/uploads/${req.file.filename}` : null;

    const bag = await Bag.findById(req.params.id);
    if (!bag) {
      return res.status(404).json({ error: 'Bag not found' });
    }

   
    if (newImage && bag.image) {
      const oldImagePath = path.join(__dirname, '..', bag.image);
      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.error('Error deleting old image:', err);
        } else {
          console.log('Old image deleted successfully');
        }
      });
    }

   
    const updatedBag = await Bag.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        image: newImage || bag.image, 
        availableBags,
        Number,
        price,
      },
      { new: true }
    );

    res.json(updatedBag);
  } catch (err) {
    console.error('Error in updateBag:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};





exports.deleteBag = async (req, res) => {
  try {
    const bag = await Bag.findById(req.params.id);
    if (!bag) {
      return res.status(404).json({ error: 'Bag not found' });
    }

   
    if (bag.image) {
      const imagePath = path.join(__dirname, '..', bag.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error deleting image:', err);
        } else {
          console.log('Image deleted successfully');
        }
      });
    }

    await Bag.findByIdAndDelete(req.params.id);
    res.json({ message: 'Bag and image deleted successfully' });
  } catch (err) {
    console.error('Error in deleteBag:', err);
    res.status(500).json({ error: err.message });
  }
};
