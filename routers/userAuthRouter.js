const express = require('express');
const { userAuthControllerHome, userAuthControllerRegister, userAuthControllerLogin } = require('../controllers/userAuthController');
const userAuth = require('../middleware/AuthMiddleware');
const router = express.Router();

router.route('/').get(userAuth, userAuthControllerHome);
router.route('/register').put(userAuthControllerRegister)
router.route('/login').post(userAuthControllerLogin)


module.exports = router