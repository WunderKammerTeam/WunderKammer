const amazonAPI = require('amazon-product-api');
const KEY = "AKIAJFJIRUMG6IMSYXQA";
const SECRET = "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";


const amazon = amazonAPI.createClient({
    awsID: KEY,
    awsSecret: SECRET,
    awsTag: "wunderkammer0a-21"
})

module.exports = amazon;

