//Info about the amazon-product-api at: https://www.npmjs.com/package/amazon-product-api
const amazonAPI = require('amazon-product-api');

// Environment Variables ----> IMPORTANT: remeber to add the .env file to GitIgnore!!!
// The amazon Afiliated Id, secret and TAG are at the .env file.
// If we need to change the keys or secret, go to: https://afiliados.amazon.es/home
const KEY = process.env.AMAZON_AFILIATED_KEY;
const SECRET = process.env.AMAZON_AFILIATED_SECRET;
const TAG = process.env.AMAZON_AFILIATED_TAG;

const amazon = amazonAPI.createClient({
    awsId: KEY,
    awsSecret: SECRET,
    awsTag: TAG
})

module.exports = amazon;

