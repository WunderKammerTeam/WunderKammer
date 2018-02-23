const express = require('express');
const productsController = require('../controllers/products.controller');
const router = express.Router();

router.get('/', productsController.showAll);

router.get('/edit', productsController.editproducts);

router.get('/new', productsController.new);
router.post('/create', productsController.create);
router.get('/:id', productsController.show);
router.get('/:id/edit', productsController.edit);
router.post('/:id/update', productsController.update);
router.post('/:id/delete', productsController.delete);

router.get('/amazoncheck/:id', productsController.amazoncheck);


module.exports = router;
