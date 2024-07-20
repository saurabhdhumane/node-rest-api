const express = require('express')
const router = express.Router()
const {welcomeController, testController} = require('../controllers/welcomeController')

router.route('/home').get(welcomeController)
router.route('/test').get(testController)

module.exports = router;