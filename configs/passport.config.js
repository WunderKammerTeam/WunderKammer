const User = require('../models/user.model');
const LocalStrategy = require('passport-local').Strategy;
const AmazonStrategy = require("passport-amazon"); // more info at: https://www.npmjs.com/package/passport-amazon

// Environment Variables ----> IMPORTANT: remeber to add the .env file to GitIgnore!!!
// The amazon SOCIAL LOGIN Id, secret and callback rul are at the .env file.
// If we need to change anything go to .env and: https://login.amazon.com/
const clientID = process.env.AMAZON_LOGIN_CLIENT_ID;
const clientSecret = process.env.AMAZON_LOGIN_CLIENT_SECRET;
const callbackURL = process.env.AMAZON_LOGIN_CALLBACK_URL;

module.exports.setup = (passport) => {

    passport.serializeUser((user, next) => {
        next(null, user._id);
    });

    passport.deserializeUser((id, next) => {
        User.findById(id)
            .then(user => {
                next(null, user);
            })
            .catch(error => next(error));
    });

    passport.use('local-auth', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (email, password, next) => {
        User.findOne({ email: email })
            .then(user => {
                if (!user) {
                    next(null, user, { password: 'Invalid email or password' });
                } else {
                    user.checkPassword(password)
                        .then(match => {
                            if (match) {
                                next(null, user);
                            } else {
                                next(null, null, { password: 'Invalid email or password' });
                            }
                        })
                        .catch(error => next(error));
                }
            })
            .catch(error => next(error));
    }));

    passport.use( new AmazonStrategy({
        clientID,
        clientSecret,
        callbackURL
      },
      function(accessToken, refreshToken, profile, done) {
        console.log('Entro en la estrategia');
        console.log(profile)
      }
    ));

}