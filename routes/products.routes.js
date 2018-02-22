const express = require('express');
const productsController = require('../controllers/products.controller');
const router = express.Router();

router.get('/index', productsController.showAll);
router.get('/', productsController.index);
router.get('/new', productsController.new);
router.post('/', productsController.create);
router.get('/:id/edit', productsController.edit);
router.post('/:id', productsController.update);

router.get('/:id', productsController.show);



router.post('/:id/delete', productsController.delete);

router.get('/amazoncheck/:id', productsController.amazoncheck);


module.exports = router;
