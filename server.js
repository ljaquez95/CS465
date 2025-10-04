require('./app_server/models/db'); 

const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const Handlebars = require('handlebars');

const travellerRouter = require('./app_server/routes/traveller');
const travelRoute = require('./app_server/routes/travel');
const apiRouter = require('./app_api/routes/index');

const app = express();

app.engine('hbs', hbs.engine({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: path.join(__dirname, 'app_server', 'views', 'layouts'),
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

hbs.create({}).handlebars.registerPartial(
  'footer',
  require('fs').readFileSync(path.join(__dirname, 'app_server', 'views', 'partials', 'footer.hbs'), 'utf8')
);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', travellerRouter);
app.use('/travel', travelRoute);
app.use('/api', apiRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

