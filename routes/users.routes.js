const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.get('/', usersController.get);
// Only active in development
router.get('/userdb', usersController.getUserDb);


module.exports = router;
