const User = require('../models/user.model');
const LocalStrategy = require('passport-local').Strategy;
const AmazonStrategy = require("passport-amazon");

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
        clientID: "amzn1.application-oa2-client.3fe92d20371c4baa99f8fe749bcdf3f1",
        clientSecret: "d49d3233150dbc5ba1291136a0def2b433bcf3dd53725cc919ee790da72ddbe3",
        callbackURL: "http://localhost:3000/amazon/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        console.log('Entro en la estrategia');
        console.log(profile)
      }
    ));

}