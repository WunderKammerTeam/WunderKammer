const Product = require('../models/product.model');

module.exports.home = (req, res) => {
  Product.find({}).then((products) => {
    res.render('index', {products});
  });
};

module.exports.privacy = (req, res) => {
    res.render('privacy');
};

