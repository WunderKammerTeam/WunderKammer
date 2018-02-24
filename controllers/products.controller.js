const Product = require('../models/product.model');
const amazon = require('../configs/amazon.config');


module.exports.showAll = (req, res) => {
  Product.find({}).then((products) => {
    res.render('products/index', { products: products} );
  });
};


module.exports.editproducts = (req, res) => {
  if (req.user && req.user.isAdmin) {
    Product.find({}).then((products) => {
      res.render('products/edit', {
          products: products
      });
    });
  } else {
    res.redirect('/');
  }
};


module.exports.show = (req, res) => {
  Product.findById(req.params.id).then((product) => {
    res.render('products/show', {
      product: product
    });
  });
};




module.exports.delete = (req, res) => {
    Product.remove({_id: req.params.id}).then(() => {
    res.redirect('/products/edit');
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

  let createDescriptionArray =[];
  // si hay imagenes las añadimos a la matriz
    if ( req.body.description_0 != "") {createDescriptionArray.push(req.body.description_0)};
    if ( req.body.description_1 != "") {createDescriptionArray.push(req.body.description_1)};
    if ( req.body.description_2 != "") {createDescriptionArray.push(req.body.description_2)};
    if ( req.body.description_3 != "") {createDescriptionArray.push(req.body.description_3)};
    if ( req.body.description_4 != "") {createDescriptionArray.push(req.body.description_4)};

  let createPhotosArray =[];
  // si hay imagenes las añadimos a la matriz
    if ( req.body.images_array_0 != "") {createPhotosArray.push(req.body.images_array_0)};
    if ( req.body.images_array_1 != "") {createPhotosArray.push(req.body.images_array_1)};
    if ( req.body.images_array_2 != "") {createPhotosArray.push(req.body.images_array_2)};
    if ( req.body.images_array_3 != "") {createPhotosArray.push(req.body.images_array_3)};
    if ( req.body.images_array_4 != "") {createPhotosArray.push(req.body.images_array_4)};


  const product = new Product({
    id_amazon: req.body.id_amazon,
    url_amazon: req.body.url_amazon,
    name: req.body.name,
    description: createDescriptionArray,
    category: req.body.category,
    price: req.body.price,
    images_array: createPhotosArray
  });
  product.save()
    .then(() => {
        res.redirect('/products/edit');
    })
    .catch((err) => {
      res.render('products/form', {
        err: err,
        product
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
      res.send("amazonerror");

    } else {

      // console.log("SERVER CONSOLE - esto es results:");
      // console.log(results);
      // console.log("SERVER CONSOLE - esto es response:");
      // console.log(response);

      // Creamos un array vacío en el que vamos a añadir la URL de las fotos del producto
      let photosArray =[];
      // Recorremos el array en el que vienen todas las imágenes en distintos formatos y con más propiedades y nos quedamos solo con un array con la URL de las imágenes en calidad Large y las añadimos a PhotosArray
      for (let i = 0; i < response[0].Item[0].ImageSets[0].ImageSet.length; i++){
        console.log("adding photo" + i);
        photosArray.push(response[0].Item[0].ImageSets[0].ImageSet[i].LargeImage[0].URL[0]);
      }

      
      var amazonResponse = { 
        "id_amazon": response[0].Item[0].ASIN[0],
        "url_amazon": response[0].Item[0].DetailPageURL[0],
        "name": response[0].Item[0].ItemAttributes[0].Title[0],
        "description": response[0].Item[0].ItemAttributes[0].Feature, // esto es un array, ojo!!
        "price": response[0].Item[0].ItemAttributes[0].ListPrice[0].FormattedPrice[0],
        "images_array": photosArray
      };

      // console.log("SERVER CONSOLE - esto es el objeto que enviamos como respuesta:");
      console.log(amazonResponse);
      res.send(amazonResponse);
  
    }
  });
};