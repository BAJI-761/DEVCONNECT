const express = require('express');
const router = express.Router();
const { getComments, addComment, deleteComment, toggleLike } = require('../controllers/commentController');
const { protect } = require('../middleware/auth');

router.get('/:postId', protect, getComments);
router.post('/:postId', protect, addComment);
router.delete('/:id', protect, deleteComment);
router.post('/:id/like', protect, toggleLike);

module.exports = router;
