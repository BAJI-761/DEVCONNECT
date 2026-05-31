const express = require('express');
const {
  getProfile,
  updateProfile,
  uploadAvatar,
  uploadCover,
  followUser,
  unfollowUser,
  getSuggestedUsers
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { uploadAvatar: avatarUpload, uploadCover: coverUpload } = require('../middleware/upload');

const router = express.Router();

router.get('/suggested', protect, getSuggestedUsers);
router.get('/:username', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put('/avatar', protect, avatarUpload.single('avatar'), uploadAvatar);
router.put('/cover', protect, coverUpload.single('coverImage'), uploadCover);
router.post('/:id/follow', protect, followUser);
router.post('/:id/unfollow', protect, unfollowUser);

module.exports = router;
