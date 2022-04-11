var express = require('express');
var router = express.Router();

const { isLoginAdmin } = require('../middleware/auth')
const { index } = require('./controller');

// middleware
router.use(isLoginAdmin);

/* GET home page. */
router.get('/', index);


module.exports = router;
