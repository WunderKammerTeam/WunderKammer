const mongoose = require('mongoose');
const Product = require('../models/product.model');
const User = require('../models/user.model');
mongoose.connect('mongodb://localhost/wunderkammer_db');

const productData = [
  {
    "id_amazon": "B0089KZPNU",
    "url_amazon": "https://www.amazon.com/ThinkGeek-Easy-Open-Canned-Unicorn-Meat/dp/B0089KZPNU",
    "name": "unicorn meat",
    "description": "Easy-Open Canned Unicorn Meat: Excellent Source of Sparkles, Magic in Every Bite",
    "category": "Unicorn Stuff",
    "price": "10$",
    "image": "https://images-na.ssl-images-amazon.com/images/I/51Ok0UGbDOL.jpg"
  },
  {
    "id_amazon": "B0153STBZS",
    "url_amazon": "https://www.amazon.com/dp/B0153STBZS/?tag=bfbetsy-20&ascsubtag=4431391,11,24,desktop,betsydickerson,diy",
    "name": "Centaur Hand Finger",
    "description": "Centaur Hand Finger Puppet Set",
    "category": "Toys",
    "price": "10$",
    "image": "https://images-na.ssl-images-amazon.com/images/I/61dwO6aJ8vL._SL1001_.jpg"
  },
  {
    "id_amazon": "B00FYV8ELM",
    "url_amazon": "https://www.amazon.com/dp/B00FYV8ELM/?tag=bfbetsy-20&ascsubtag=4431391,4,24,desktop,betsydickerson,diy",
    "name": "Gummy Bear Skeleton",
    "description": "Gummi Bear Skeleton Anatomy Model Kit",
    "category": "Toys",
    "price": "10$",
    "image": "https://images-na.ssl-images-amazon.com/images/I/71-7hxETLkL._SL1500_.jpg"
  },
  {
    "id_amazon": "B00BC1GCOO",
    "url_amazon": "https://www.amazon.com/dp/B00BC1GCOO/?tag=bfbetsy-20&ascsubtag=4431391,7,24,desktop,betsydickerson,diy",
    "name": "Headband with long hair",
    "description": "Headband with long hair",
    "category": "Wear",
    "price": "9.99$",
    "image": "https://images-na.ssl-images-amazon.com/images/I/61-sZzHdYNL._SL1024_.jpg"
  },
  {
    "id_amazon": "B00TLXUOOY",
    "url_amazon": "https://www.amazon.com/dp/B00TLXUOOY/?tag=bfbetsy-20&ascsubtag=4431391,6,24,desktop,betsydickerson,diy",
    "name": "Asia Old Man Wall Mural",
    "description": "Asia Old Man Wall Mural",
    "category": "Decoration",
    "price": "79.96$",
    "image": "Asia Old Man Wall Mural"
  }
];

const userData = [{
  name: 'EvaAdmin',
  password: 'Cristian',
  email: 'evaadmin@admin.com',
  isAdmin: true
},
{
  name: 'juanchoAdmin',
  password: 'Cristian',
  email: 'juanchoadmin@admin.com',
  isAdmin: true
}];

Product.create(productData, (err, products) => {
  if (err) throw err;

  products.forEach((product) => {
    console.log(product.name);
  })

})

User.create(userData, (err, users) => {
  if (err) throw err;

  users.forEach((user) => {
    console.log(user.name);
  })
  mongoose.connection.close();
});
