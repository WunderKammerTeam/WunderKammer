const mongoose = require('mongoose');
const User = require('../models/user.model');
const passport = require('passport');

module.exports.signup = (req, res) => {
  res.render('auth/signup');
};

module.exports.doSignup = (req, res, next) => {
  User.findOne({email: req.body.email})
    .then(user => {
      if (user != null) {
        res.render('auth/signup', {
          user: user,
          error: {email: 'User already register'}
        });
      } else {
        user = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
        user.save()
          .then(() => {
            res.redirect('/login');
          }).catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
              res.render('auth/signup', {
                user: user,
                error: error.errors
              });
            } else {
              next(error);
            }
          });
      }
    })
    .catch(error => next(error));
};

module.exports.login = (req, res, next) => {
  const showFavMessage = req.query.showFavMessage || false;
  res.render('auth/login', {
    showFavMessage
  });
}

module.exports.doLogin = (req, res, next) => {
  const showFavMessage = req.query.showFavMessage || false;
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    res.render('auth/login', {
      showFavMessage,
      user: {email: email},
      error: {
        email: email ? '' : 'Email is required',
        password: password ? '' : 'Password is required'
      }
    });
  } else {
    passport.authenticate('local-auth', (error, user, validation) => {
      if (error) {
        next(error);
      } else if (!user) {
        res.render('auth/login', {
          showFavMessage,
          error: validation,
        });
      } else {
        req.login(user, (error) => {
          if (error) {
            next(error);
          } else {
            res.redirect('/');
          }
        });
      }
    })(req, res, next);
  }
};

module.exports.amazon = (req, res, next) => {
  console.log('entro al callback')
};

module.exports.logout = (req, res) => {
  req.logout();
  res.redirect('/login');
};
