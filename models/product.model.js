const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ProductSchema = new Schema({
    id_amazon: {
        type: String,
        // required: [true, 'Amazon´s ID is required']
    },
    url_amazon: {
        type: String,
        // required: [true, 'Amazon´s URL is required']
    },
    name: {
        type: String,
        required: [true, 'Name is required']
      },
    description: {
        type: String,
        required: [true, 'Name is required'],
        maxlength: 250
    },
    category: {
        type: String,
        enum: [ "Toys", "Wear", "Unicorn Stuff", "Decoration"]

    },
    price: {
        type: String,
        required: [true, 'Price is required'],
        min: 0
    },
    image: {
        type: String,
        default: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=250×250&w=250&h=250'
    }
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
