//Info about the amazon-product-api at: https://www.npmjs.com/package/amazon-product-api
const amazonAPI = require('amazon-product-api');

// Rquire Environment Variables ----> IMPORTANT: remeber to add the .env file to GitIgnore!!!
// Here are the amazon Id, secret and TAG. 
// If we need to change the keys or secret, go to: https://afiliados.amazon.es/home
require("dotenv").config();

const amazon = amazonAPI.createClient({
    awsId: process.env.AMAZON_AFILIATED_KEY,
    awsSecret: process.env.AMAZON_AFILIATED_SECRET,
    awsTag: process.env.AMAZON_AFILIATED_TAG
})

module.exports = amazon;

