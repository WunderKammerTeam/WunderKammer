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

  const userId = req.params.id;
  const updates = {
      name: req.body.name,
      image: req.body.image,
      description: req.body.description
  };

  Product.findByIdAndUpdate(userId, updates).then(() => {
    res.redirect('/users/profile');
  });
};
module.exports.pic = (req, res) => {
    User.findById(req.params.id).then((user) => {
    res.sendFile(path.join(__dirname, '../', user.file));
  });
};
  // Coger los datos de req.body
  // Guardarlos en un objecto
  // Llamar a User.findByIdAndUpdate y actualizar el usuario
  // Cuando se haya guardado, redirect a /users/profile/<%= id del profile %>
