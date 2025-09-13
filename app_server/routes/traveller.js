const express = require('express');
const router = express.Router();
const ctrlTraveller = require('../controllers/traveller');

// Traveller route
router.get('/traveller', ctrlTraveller.traveller);

module.exports = router;
