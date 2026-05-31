const User = require('../models/User');
const Notification = require('../models/Notification');
const { getIo } = require('../socket');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

// @desc    Get user profile by username
// @route   GET /api/users/:username
// @access  Private
const getProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username })
    .select('-password')
    .populate('followers', 'name username avatar bio')
    .populate('following', 'name username avatar bio');

  if (!user) {
    return next(new ApiError(404, 'User not found'));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res, next) => {
  const { name, bio, location, website, github, skills } = req.body;

  let skillsArray = [];
  if (skills) {
    skillsArray = typeof skills === 'string' ? skills.split(',').map(s => s.trim()) : skills;
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      name,
      bio,
      location,
      website,
      github,
      ...(skills && { skills: skillsArray }),
    },
    { new: true, runValidators: true }
  ).select('-password');

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Upload avatar
// @route   PUT /api/users/avatar
// @access  Private
const uploadAvatar = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new ApiError(400, 'Please upload a file'));
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { avatar: req.file.path },
    { new: true }
  ).select('-password');

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Upload cover image
// @route   PUT /api/users/cover
// @access  Private
const uploadCover = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new ApiError(400, 'Please upload a file'));
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { coverImage: req.file.path },
    { new: true }
  ).select('-password');

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Follow a user
// @route   POST /api/users/:id/follow
// @access  Private
const followUser = asyncHandler(async (req, res, next) => {
  if (req.user.id === req.params.id) {
    return next(new ApiError(400, 'You cannot follow yourself'));
  }

  const userToFollow = await User.findById(req.params.id);
  if (!userToFollow) {
    return next(new ApiError(404, 'User not found'));
  }

  if (userToFollow.followers.includes(req.user.id)) {
    return next(new ApiError(400, 'You already follow this user'));
  }

  // Add to followers and following
  userToFollow.followers.push(req.user.id);
  await userToFollow.save();

  const currentUser = await User.findById(req.user.id);
  currentUser.following.push(userToFollow._id);
  await currentUser.save();

  // Create notification
  const notification = await Notification.create({
    recipient: userToFollow._id,
    sender: req.user.id,
    type: 'follow',
  });

  const populatedNotification = await Notification.findById(notification._id)
    .populate('sender', 'name username avatar');

  getIo().to(userToFollow._id.toString()).emit('newNotification', populatedNotification);

  res.status(200).json({
    success: true,
    message: 'User followed successfully',
  });
});

// @desc    Unfollow a user
// @route   POST /api/users/:id/unfollow
// @access  Private
const unfollowUser = asyncHandler(async (req, res, next) => {
  const userToUnfollow = await User.findById(req.params.id);
  if (!userToUnfollow) {
    return next(new ApiError(404, 'User not found'));
  }

  userToUnfollow.followers = userToUnfollow.followers.filter(
    (id) => id.toString() !== req.user.id.toString()
  );
  await userToUnfollow.save();

  const currentUser = await User.findById(req.user.id);
  currentUser.following = currentUser.following.filter(
    (id) => id.toString() !== userToUnfollow._id.toString()
  );
  await currentUser.save();

  res.status(200).json({
    success: true,
    message: 'User unfollowed successfully',
  });
});

// @desc    Get suggested users
// @route   GET /api/users/suggested
// @access  Private
const getSuggestedUsers = asyncHandler(async (req, res, next) => {
  // Simple algorithm: return 5 random users the current user is not following
  const currentUser = await User.findById(req.user.id);
  const followingIds = currentUser.following;
  
  const suggested = await User.aggregate([
    { 
      $match: { 
        _id: { $nin: [...followingIds, currentUser._id] } 
      } 
    },
    { $sample: { size: 5 } },
    { $project: { password: 0 } }
  ]);

  res.status(200).json({
    success: true,
    data: suggested,
  });
});

module.exports = {
  getProfile,
  updateProfile,
  uploadAvatar,
  uploadCover,
  followUser,
  unfollowUser,
  getSuggestedUsers
};
