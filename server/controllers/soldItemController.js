const SoldItem = require('../models/SoldItem'); 

const getSoldItems = async (req, res) => {
  try {
    const soldItems = await SoldItem.find().populate('bagId'); 
    res.status(200).json(soldItems);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch sold items', error: error.message });
  }
};

module.exports = { getSoldItems };
