const express = require('express');
const productsController = require('../controllers/products.controller');

const router = express.Router();

router.get('/', productsController.index);
router.get('/new', productsController.new);
router.post('/', productsController.create);

module.exports = router;