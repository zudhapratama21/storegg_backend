var express = require('express');
var router = express.Router();

const { viewSignin, actionSignin, actionLogout} = require('./controller');

/* GET category page. */
router.get('/', viewSignin);
router.post('/login', actionSignin);
router.get('/logout', actionLogout);


module.exports = router;

