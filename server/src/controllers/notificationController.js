const Notification = require('../models/Notification');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get all notifications for user
// @route   GET /api/notifications
// @access  Private
const getNotifications = asyncHandler(async (req, res, next) => {
  const notifications = await Notification.find({ recipient: req.user.id })
    .populate('sender', 'name username avatar')
    .populate('post', 'content image')
    .sort({ createdAt: -1 })
    .limit(50); // Get last 50 notifications

  res.status(200).json({
    success: true,
    data: notifications,
  });
});

// @desc    Mark all notifications as read
// @route   PUT /api/notifications/read
// @access  Private
const markAsRead = asyncHandler(async (req, res, next) => {
  await Notification.updateMany(
    { recipient: req.user.id, read: false },
    { read: true }
  );

  res.status(200).json({
    success: true,
    message: 'Notifications marked as read',
  });
});

module.exports = {
  getNotifications,
  markAsRead,
};
