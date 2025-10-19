const User = require('../models/user');
const passport = require('passport');

const register = async (req, res) => {
  try {
    if(!req.body.email || !req.body.password || !req.body.name) {
      return res.status(400).json({ message: 'All fields required' });
    }
    // checks users exisy
    const existing = await User.findOne({ email: req.body.email }).exec();
    if(existing) return res.status(400).json({ message: 'Email already registered' });

    const user = new User({
      name: req.body.name,
      email: req.body.email
    });
    user.setPassword(req.body.password);
    await user.save();

    const token = user.generateJWT();
    res.status(201).json({ token });
  } catch(err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const login = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'All fields required' });
  }
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).json(err);
    if (!user) return res.status(401).json(info);
    const token = user.generateJWT();
    return res.status(200).json({ token });
  })(req, res, next);
};

module.exports = { register, login };

