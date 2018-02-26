//Info about the amazon-product-api at: https://www.npmjs.com/package/amazon-product-api
const amazonAPI = require('amazon-product-api');

// Environment Variables ----> IMPORTANT: remeber to add the .env file to GitIgnore!!!
// The amazon Afiliated Id, secret and TAG are at the .env file.
//Esto para ESPAÑA
// If we need to change the keys or secret, go to: https://afiliados.amazon.es/home
// He cambiado y he puesto que ahora la PAI haga el check sólo con USA
// If we need to change the keys or secret, go to: https://affiliate-program.amazon.com
//En product.controller se especifica el pais al que dirigimos la consulta!!
const KEY = process.env.AMAZON_AFILIATED_KEY;
const SECRET = process.env.AMAZON_AFILIATED_SECRET;
const TAG = process.env.AMAZON_AFILIATED_TAG; //esta etiqueta también cambia al pasar a estdos unidos. aparentemente el ID y el SECRET son iguales en USA y ESAPÑA, supongo q pq van con mi email

const amazon = amazonAPI.createClient({
    awsId: KEY,
    awsSecret: SECRET,
    awsTag: TAG
})

module.exports = amazon;

