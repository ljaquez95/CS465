const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(401);
    req.auth = decoded;
    next();
  });
}

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/trips', tripsController.tripsList);
router.get('/trips/:tripCode', tripsController.tripReadOne);

router.post('/trips', auth, tripsController.tripsAddOne);
router.put('/trips/:tripCode', auth, tripsController.tripsUpdateOne);

module.exports = router;

