const Mongoose = require('../db');
const Trip = require('./travlr');
const fs = require('fs');
const path = require('path');

const tripsFilePath = path.join(__dirname, '..', '..', 'data', 'trips.json');
const trips = JSON.parse(fs.readFileSync(tripsFilePath, 'utf8'));

const seedDB = async () => {
  try {
    console.log("Seeding database...");
    await Trip.deleteMany({});
    console.log("Deleted existing trips.");
    await Trip.insertMany(trips);
    console.log(`Inserted ${trips.length} trips.`);
  } catch (err) {
    console.error(err);
  }
};

seedDB()
  .then(async () => {
    await Mongoose.connection.close();
    console.log("Mongoose disconnected after seeding.");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

