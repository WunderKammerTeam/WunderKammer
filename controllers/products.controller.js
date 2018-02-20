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

  amazon.itemLookup({
    idType: 'ASIN',
    itemId: req.params.id,
    domain: 'webservices.amazon.es',
    responseGroup: 'ItemAttributes,Images'
  }, function(err, results, response) {
    if (err) {
      console.log("la api ha dado un puto error:");
      console.log(err);
    } else {
      console.log("esto es results:");
      console.log(results);
      
      
     
       // Nota:  ItemLinks son enlaces a revisiones, añadir a la wishlist de amazon, tell a friend y offers...

        // products (Array of Object) 
      console.log("esto es response:");

      console.log("ID AMAZON:");
      console.log(response[0].Item[0].ASIN);
      console.log("URL EN AMAZON:");
      console.log(response[0].Item[0].DetailPageURL);

      console.log("FOTOS:");
      console.log(response[0].Item[0].SmallImage);  // esto es la foto ppal en pequeño
      console.log(response[0].Item[0].MediumImage); // esto es la foto ppal en mediano
      console.log(response[0].Item[0].LargeImage);  // esto es la foto ppal en grande
      console.log(response[0].Item[0].ImageSets);

      console.log("DESCRIPCION:");
      console.log(response[0].Item[0].ItemAttributes[0].Feature);
      console.log("PRECIO:");
      console.log(response[0].Item[0].ItemAttributes[0].ListPrice[0].FormattedPrice);
    }
  });


  res.send( "hola amazon soy tu controlador");
};