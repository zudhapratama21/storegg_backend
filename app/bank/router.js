var express = require('express');
var router = express.Router();

const { isLoginAdmin } = require('../middleware/auth')

const { index, viewCreate, actionCreate, viewEdit, actionEdit, actionDelete } = require('./controller');

// middleware
router.use(isLoginAdmin);

/* GET category page. */
router.get('/', index);
router.get('/create', viewCreate);
router.post('/create', actionCreate);
router.get('/edit/:id', viewEdit);
router.put('/edit/:id', actionEdit);
router.delete('/delete/:id', actionDelete);

module.exports = router;

