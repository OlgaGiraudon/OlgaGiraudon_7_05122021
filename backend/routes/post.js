const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');

router.get('/list', postCtrl.list);
router.post('/create', auth, postCtrl.create);

module.exports = router; 