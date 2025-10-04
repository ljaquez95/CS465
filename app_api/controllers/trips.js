const mongoose = require('mongoose');
require('../models/travlr');
const Trip = mongoose.model('trips');

const tripsList = async (req, res) => {
  if (!mongoose.connection.readyState) {
    return res.status(500).json({ message: "Database not connected" });
  }
  try {
    const trips = await Trip.find({});
    res.status(200).json(trips);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const tripReadOne = async (req, res) => {
  if (!mongoose.connection.readyState) {
    return res.status(500).json({ message: "Database not connected" });
  }
  const tripCode = req.params.tripCode;
  try {
    const trip = await Trip.findOne({ code: tripCode });
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    res.status(200).json(trip);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  tripsList,
  tripReadOne
};

