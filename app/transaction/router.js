var express = require('express');
var router = express.Router();
const { isLoginAdmin } = require('../middleware/auth')

const { index, actionStatus} = require('./controller');

// middleware
router.use(isLoginAdmin);

/* GET category page. */
router.get('/', index);
router.put('/status/:id', actionStatus);

module.exports = router;


