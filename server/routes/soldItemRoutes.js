const express = require('express');
const { getSoldItems } = require('../controllers/soldItemController');
const router = express.Router();


router.get('/', getSoldItems); 
module.exports = router;
