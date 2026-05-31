const Post = require('../models/Post');
const Notification = require('../models/Notification');
const { getIo } = require('../socket');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

// @desc    Get all posts
// @route   GET /api/posts
// @access  Private
const getPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find()
    .populate('user', 'name username avatar')
    .populate('comments.user', 'name username avatar')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: posts.length,
    data: posts,
  });
});

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Private
const getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id)
    .populate('user', 'name username avatar')
    .populate('comments.user', 'name username avatar');

  if (!post) {
    return next(new ApiError(404, 'Post not found'));
  }

  res.status(200).json({
    success: true,
    data: post,
  });
});

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res, next) => {
  const { content } = req.body;
  
  let image = null;
  if (req.file) {
    image = req.file.path;
  }

  const post = await Post.create({
    user: req.user.id,
    content,
    image,
  });

  const populatedPost = await Post.findById(post._id).populate('user', 'name username avatar');

  res.status(201).json({
    success: true,
    data: populatedPost,
  });
});

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ApiError(404, 'Post not found'));
  }

  // Make sure user owns post
  if (post.user.toString() !== req.user.id) {
    return next(new ApiError(403, 'User not authorized to delete this post'));
  }

  await post.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Like / Unlike post
// @route   PUT /api/posts/:id/like
// @access  Private
const toggleLike = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ApiError(404, 'Post not found'));
  }

  // Check if post has already been liked by this user
  const isLiked = post.likes.includes(req.user.id);

  if (isLiked) {
    post.likes = post.likes.filter(userId => userId.toString() !== req.user.id);
  } else {
    post.likes.push(req.user.id);
    
    // Create notification if liking someone else's post
    if (post.user.toString() !== req.user.id) {
      const notification = await Notification.create({
        recipient: post.user,
        sender: req.user.id,
        type: 'like',
        post: post._id,
      });

      const populatedNotification = await Notification.findById(notification._id)
        .populate('sender', 'name username avatar')
        .populate('post', 'content image');

      getIo().to(post.user.toString()).emit('newNotification', populatedNotification);
    }
  }

  await post.save();

  res.status(200).json({
    success: true,
    data: post.likes,
  });
});

// @desc    Add comment to post
// @route   POST /api/posts/:id/comments
// @access  Private
const addComment = asyncHandler(async (req, res, next) => {
  const { content } = req.body;
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ApiError(404, 'Post not found'));
  }

  const newComment = {
    user: req.user.id,
    content,
  };

  post.comments.push(newComment);
  await post.save();

  // Create notification if commenting on someone else's post
  if (post.user.toString() !== req.user.id) {
    const notification = await Notification.create({
      recipient: post.user,
      sender: req.user.id,
      type: 'comment',
      post: post._id,
    });

    const populatedNotification = await Notification.findById(notification._id)
      .populate('sender', 'name username avatar')
      .populate('post', 'content image');

    getIo().to(post.user.toString()).emit('newNotification', populatedNotification);
  }

  const populatedPost = await Post.findById(req.params.id)
    .populate('comments.user', 'name username avatar');

  res.status(200).json({
    success: true,
    data: populatedPost.comments,
  });
});

module.exports = {
  getPosts,
  getPost,
  createPost,
  deletePost,
  toggleLike,
  addComment
};
