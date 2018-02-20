const Product = require('../models/product.model');
const amazon = require('../configs/amazon.config');


module.exports.index = (req, res) => {
  if (req.user && req.user.isAdmin) {
    Product.find({}).then((products) => {
      res.render('products/index', {
          products: products
      });
    });
  } else {
    res.redirect('/');
  }
};

module.exports.delete = (req, res) => {
    Product.remove({_id: req.params.id}).then(() => {
    res.redirect('/products');
  });
};

module.exports.new = (req, res) => {
  if (req.user && req.user.isAdmin) {
    const product = new Product({});
    res.render('products/form', {
      product
    });
  } else {
    res.redirect('/');
  }
};

module.exports.create = (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  });
  product.save()
    .then(() => {
        res.redirect('/products');
    })
    .catch((err) => {
      res.render('products/form', {
        err: err,
        product
      });
    });
};

module.exports.show = (req, res) => {
  Product.findById(req.params.id).then((product) => {
    res.render('products/show', {
      product: product
    });
  });
};

module.exports.edit = (req, res) => {
  Product.findById(req.params.id).then((product) => {
    res.render('products/form', {
      product: product
    });
  });
};

module.exports.update = (req, res) => {
  const productId = req.params.id;
  const updates = {
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      description: req.body.description
  };

  Product.findByIdAndUpdate(productId, updates).then(() => {
    res.redirect('/products');
  });
};

module.exports.pic = (req, res) => {
    Product.findById(req.params.id).then((product) => {
    res.sendFile(path.join(__dirname, '../', product.file));
  });
};

module.exports.amazoncheck = (req, res) => {

  amazon.itemSearch({
    idType: 'ASIN',
    itemId: req.params.id,
    domain: "webservices.amazon.com"
  }, function(err, results, response) {
    if (err) {
      console.log("la api ha dado un puto error:");
      console.log(err.Error);
    } else {
      console.log(results);  // products (Array of Object) 
      console.log(response); // response (Array where the first element is an Object that contains Request, Item, etc.) 
    }
  });


  res.send( "hola amazon soy tu controlador");
};