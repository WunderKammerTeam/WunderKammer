const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index.controller');

router.get('/', indexController.home);

router.get('/privacy', indexController.privacy);

module.exports = router;