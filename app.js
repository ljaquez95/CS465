const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const travellerRouter = require('./app_server/routes/traveller');

const app = express();

// View engine setup
app.engine('hbs', hbs.engine({ 
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: path.join(__dirname, 'app_server', 'views', 'layouts')
}));
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// Routes
app.use('/', travellerRouter);

// Server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
