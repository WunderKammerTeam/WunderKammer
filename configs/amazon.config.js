//Info about the amazon-product-api at: https://www.npmjs.com/package/amazon-product-api
const amazonAPI = require('amazon-product-api');
//IMPORTANTE: el secreto y mi clave ahora mismo son públicos en GitHub!!!!
// revisar y proteger
const KEY = "AKIAIOCE7TRKM2YWXPJQ";
const SECRET = "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";
const TAG = "wunderkammer0a-21";

const amazon = amazonAPI.createClient({
    awsId: KEY,
    awsSecret: SECRET,
    awsTag: TAG
})

module.exports = amazon;

