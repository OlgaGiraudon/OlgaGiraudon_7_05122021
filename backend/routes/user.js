const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');

router.post('/signup', multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/checkValidUser', userCtrl.checkValidUser);
router.post('/deleteUser', auth, userCtrl.deleteUser);

module.exports = router; 