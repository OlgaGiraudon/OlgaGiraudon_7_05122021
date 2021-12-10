const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

router.get('/list', auth, commentCtrl.list);
router.post('/add', auth, commentCtrl.add);

module.exports = router; 