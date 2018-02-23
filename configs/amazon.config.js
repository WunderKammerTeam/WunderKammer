//Info about the amazon-product-api at: https://www.npmjs.com/package/amazon-product-api
const amazonAPI = require('amazon-product-api');

//IMPORTANTE: el secreto y mi clave ahora mismo son públicos en GitHub!!!!
// revisar y proteger
// las claves se cambian en: https://afiliados.amazon.es/home
const KEY = "AKIAIWMWVV5ZQ2JX266Q";
const SECRET = "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";
const TAG = "wunderkammer0a-21";

const amazon = amazonAPI.createClient({
    awsId: KEY,
    awsSecret: SECRET,
    awsTag: TAG
})

module.exports = amazon;

