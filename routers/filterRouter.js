const express = require('express');
const filterControllerGet = require('../controllers/filterController');
const router = express.Router();

router.route('/filter').get(filterControllerGet)

module.exports = router;