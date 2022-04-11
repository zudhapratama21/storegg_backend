var express = require('express');
var router = express.Router();
const multer = require('multer');
const os = require('os');


const {profile, landingPage, detailPage, category, checkout, history, historyDetail, dashboard, editProfile } = require('./controller');

const { isLoginPlayer } = require('../middleware/auth');




router.get('/landingpage', landingPage);
router.get('/:id/detailpage', detailPage);
router.get('/category', category);
router.post('/checkout', isLoginPlayer ,checkout);
router.get('/history', isLoginPlayer ,history);
router.get('/:id/historydetail', isLoginPlayer ,historyDetail);
router.get('/dashboard', isLoginPlayer ,dashboard);
router.get('/profile', isLoginPlayer ,profile);
router.put('/editprofile', 
            isLoginPlayer ,
            multer({dest : os.tmpdir()}).single('image') , 
            editProfile
            );


module.exports = router;

