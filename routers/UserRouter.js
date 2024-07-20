const express = require('express');
const {userController, userControllerGet, userControllerUpdate, userControllerDelete} = require('../controllers/userController');
const router = express.Router();

router.route('/user').get(userControllerGet)
router.route('/user').post(userController)
router.route('/user').put(userControllerUpdate)
router.route('/user').delete(userControllerDelete)



module.exports = router;