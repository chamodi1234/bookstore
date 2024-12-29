const express = require('express');
const multer = require('multer');
const { addBag, getBags, getBagById, updateBag, deleteBag } = require('../controllers/bagController');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });



router.post('/', upload.single('image'), addBag);
router.get('/', getBags);
router.get('/:id', getBagById);
router.put('/:id', upload.single('image'), updateBag);
router.delete('/:id', deleteBag);

module.exports = router;