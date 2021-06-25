const path = require('path');
const express = require('express');
//creates session middleware
const session = require('express-session');
//Handlebars is the template engine being used
const exphbs = require('express-handlebars');
//requiring routes from controllers file
const routes = require('./controllers');
//using helpers
const helpers = require('./utils/helpers');
// Import the connection object, sequelize
const sequelize = require('./config/connection');

// Create a new sequelize store using the express-session package
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

//allows us to use the helpers within express
const hbs = exphbs.create({ helpers });

// Configure and link a session object with the sequelize store
const sess = {
  secret: 'Secrets secret',
  cookie: {}, //defult is 2 days of cookie storage
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// Add express-session and store as Express.js middleware
app.use(session(sess));

//setting handlebars as the template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + '/public')));

app.use(routes);

// Connect to the database before starting the Express.js server
// If force true to drop/recreate table(s) on every sync, so set to false
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});