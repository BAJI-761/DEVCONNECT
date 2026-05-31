const express = require('express');
const {
  getPosts,
  getPost,
  createPost,
  deletePost,
  toggleLike,
  addComment
} = require('../controllers/postController');
const { protect } = require('../middleware/auth');
const { uploadCover: imageUpload } = require('../middleware/upload'); // Reusing cover upload config for post images

const router = express.Router();

router.route('/')
  .get(protect, getPosts)
  .post(protect, imageUpload.single('image'), createPost);

router.route('/:id')
  .get(protect, getPost)
  .delete(protect, deletePost);

router.put('/:id/like', protect, toggleLike);
router.post('/:id/comments', protect, addComment);

module.exports = router;
