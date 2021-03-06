// Require project dependencies
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const mongoose = require('mongoose');

// Rquire Environment Variables ----> IMPORTANT: remeber to add the .env file to GitIgnore!!!
require("dotenv").config();

// Import DB and passport config
const amazon = require('./configs/amazon.config');
require('./configs/db.config');
require('./configs/passport.config').setup(passport);

// Require routes
const index = require('./routes/index.routes');
const auth = require('./routes/auth.routes');
const users = require('./routes/users.routes');
const products = require('./routes/products.routes');

// initialize  Express application
const app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

// Middlewares
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: process.env.COOKIE_SECURE || false, //IMPORTANT: in production add this variable in .env to TRUE
    httpOnly: true
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60
  })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.title = 'WunderKammer';
  res.locals.session = req.user || {};
  next();
});

app.use('/', index);
app.use('/', auth);
app.use('/users', users);
app.use('/products', products);

// // catch 404 and forward to error handler
app.use(function(req, res, next) {
   const err = new Error('Not Found');
   err.status = 404;
   res.render('error', {err});

 });

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {err});
});

module.exports = app;
