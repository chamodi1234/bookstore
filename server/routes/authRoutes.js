const express = require('express');
const { Register, Login, GetUserProfile } = require('../controllers/authController');
const authenticate = require('../middleware/authenticate');
const router = express.Router();


router.post('/register', Register);

router.post('/login', Login);


router.get('/profile', authenticate, GetUserProfile);

module.exports = router;
