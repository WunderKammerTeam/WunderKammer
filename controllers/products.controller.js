const Product = require('../models/product.model');
const path = require('path')

module.exports.index = (req, res) => {
    Product.find({}).then((products) => {
    res.render("products/index", {
        products: products,
        path: req.path
    });
  });
};

module.exports.new = (req, res) => {
  res.render('products/new', {
    path: req.path
  });
};

module.exports.delete = (req, res) => {
    Product.remove({ _id: req.params.id }).then(() => {
    res.redirect("/products");
  });
};

module.exports.create = (req, res) => { 
  new Product({
    name: req.body.name,
    description: req.body.description
    // REVISAR ESTO!!!!! faltan elementos del producto
    // ver modelo
    //esto esta copiado de PT_solutions restaurants-gmaps
    
    })
    .save()
    .then((restaurant) => {
      res.redirect("/products");
    })
    .catch((err) => {
      res.render('products/new', {
        err: err,
        path: req.path
      });
    });
};

module.exports.pic = (req, res) => {
    Product.findById(req.params.id).then((product) => {
    res.sendFile(path.join(__dirname, '../', product.file));
  });
}