const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/like');
const auth = require('../middleware/auth');

router.get('/nbLikePost', auth, likeCtrl.nbLikePost);
router.post('/add', auth, likeCtrl.add);
router.post('/remove', auth, likeCtrl.remove);
router.get('/checkAlreadyLike', auth, likeCtrl.checkAlreadyLike);

module.exports = router; 