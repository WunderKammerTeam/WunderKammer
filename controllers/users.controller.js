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
