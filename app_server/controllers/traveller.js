const traveller = (req, res) => {
  res.render('traveller', { 
    title: 'Travlr Getaways',
    message: 'Welcome to Travlr Getaways!'
  });
};

module.exports = {
  traveller
};
