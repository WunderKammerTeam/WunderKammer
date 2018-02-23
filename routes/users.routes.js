const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.get('/', usersController.get);
// Only active in development
router.get('/userdb', usersController.getUserDb);

router.get('/profile/:id', usersController.showProfile);

router.get('/profile/:id/edit', usersController.editProfileGet);

router.post('/profile/:id/edit', usersController.editProfilePost);


module.exports = router;
