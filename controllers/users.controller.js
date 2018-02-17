const User = require('../models/user.model');

module.exports.get = (req, res) => {
  res.send('respond with a resource');
};

module.exports.getUserDb = (req, res) => {
  User.find()
    .then(users => {
      console.log(users);
      res.render('users/userdb', {users});
    });
};

module.exports.showProfile = (req, res) => {
  res.render('users/profile', {
    user: res.locals.session,
  });
};

module.exports.editProfileGet = (req, res) => {
  console.log('Entro en el controlador')
  res.render('users/editprofile', {
    user: res.locals.session,
  });
};

module.exports.editProfilePost = (req, res) => {

};
