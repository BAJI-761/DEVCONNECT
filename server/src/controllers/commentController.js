const Comment = require('../models/Comment');
const Post = require('../models/Post');
const asyncHandler = require('../utils/asyncHandler');

exports.getComments = asyncHandler(async (req, res) => {
  const postId = req.params.postId;
  const page = parseInt(req.query.page || '1', 10);
  const limit = Math.min(parseInt(req.query.limit || '10', 10), 50);
  const skip = (page - 1) * limit;

  const comments = await Comment.find({ postId }).sort({ createdAt: 1 }).skip(skip).limit(limit).populate('userId', 'name username avatar');
  res.json({ comments, page, limit });
});

exports.addComment = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const postId = req.params.postId;
  const { content } = req.body;
  const comment = await Comment.create({ postId, userId, content });
  await Post.findByIdAndUpdate(postId, { $inc: { commentsCount: 1 } });
  await comment.populate('userId', 'name username avatar');
  res.status(201).json({ comment });
});

exports.deleteComment = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const commentId = req.params.id;
  const comment = await Comment.findById(commentId);
  if (!comment) return res.status(404).json({ message: 'Comment not found' });
  if (comment.userId.toString() !== userId.toString()) return res.status(403).json({ message: 'Not allowed' });
  await comment.remove();
  await Post.findByIdAndUpdate(comment.postId, { $inc: { commentsCount: -1 } });
  res.json({ message: 'Deleted' });
});

exports.toggleLike = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const commentId = req.params.id;
  const comment = await Comment.findById(commentId);
  if (!comment) return res.status(404).json({ message: 'Comment not found' });
  const idx = comment.likes.findIndex((id) => id.toString() === userId.toString());
  if (idx === -1) comment.likes.push(userId);
  else comment.likes.splice(idx, 1);
  await comment.save();
  res.json({ likesCount: comment.likes.length, liked: idx === -1 });
});
