const Trip = require('../models/travlr');

exports.travel = (req, res) => {
  Trip.find()
    .then(trips => {
      res.render('travel', {
        title: 'Travlr Getaways',
        trips
      });
    })
    .catch(err => console.log(err));
};

