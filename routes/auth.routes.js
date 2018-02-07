const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const secure = require('../configs/passport.config');


router.get('/signup', secure.nonAuthenticated, authController.signup);
console.log("!!!!!!!!!!!!!!!!!\nArchivo AUTH.ROUTES por aqui ha pasado el programa!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
router.post('/signup', secure.nonAuthenticated, authController.doSignup);

router.get('/login', secure.nonAuthenticated, authController.login);
router.post('/login', secure.nonAuthenticated, authController.doLogin);

router.get('/logout', secure.isAuthenticated, authController.logout);

module.exports = router;