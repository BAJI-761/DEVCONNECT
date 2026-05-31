import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useToggleLike, useAddComment, useDeletePost } from '../../features/feed/useFeed';
import { Card } from '../ui/Card';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import { Heart, MessageSquare, Trash2 } from 'lucide-react';
import formatDate from '../../lib/formatDate';

export default function PostCard({ post }) {
  const user = useAuthStore((state) => state.user);
  const { mutate: toggleLike } = useToggleLike();
  const { mutate: addComment, isPending: commentPending } = useAddComment();
  const { mutate: deletePost } = useDeletePost();
  
  const [showComments, setShowComments] = useState(false);
  const [commentContent, setCommentContent] = useState('');

  const isLiked = post.likes.includes(user?._id);
  const isOwner = post.user._id === user?._id;

  const handleLike = () => {
    toggleLike(post._id);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;
    
    addComment({ postId: post._id, content: commentContent }, {
      onSuccess: () => setCommentContent('')
    });
  };

  return (
    <Card className="mb-6 p-4 sm:p-6" decoration={Math.random() > 0.5 ? 'tack' : 'none'}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3">
          <Link to={`/profile/${post.user.username}`}>
            <Avatar src={post.user.avatar} initials={post.user.name?.[0]} />
          </Link>
          <div>
            <Link to={`/profile/${post.user.username}`} className="font-heading text-lg hover:underline decoration-wavy decoration-pen block leading-none">
              {post.user.name}
            </Link>
            <span className="text-pencil/60 text-sm font-body">{formatDate(post.createdAt)}</span>
          </div>
        </div>

        {isOwner && (
          <button onClick={() => deletePost(post._id)} className="text-marker/60 hover:text-marker p-2" title="Delete Post">
            <Trash2 size={18} />
          </button>
        )}
      </div>

      <div className="mb-4">
        <p className="font-body text-pencil text-lg whitespace-pre-wrap leading-relaxed">{post.content}</p>
        
        {post.image && (
          <div className="mt-4 border-[3px] border-pencil p-2 wobbly shadow-hard-sm inline-block bg-white max-w-full">
            <img src={post.image} alt="Post attachment" className="max-w-full h-auto object-cover" />
          </div>
        )}
      </div>

      <div className="flex items-center gap-6 mt-6 pt-4 border-t-2 border-pencil border-dashed text-pencil/70">
        <button 
          onClick={handleLike}
          className={`flex items-center gap-2 font-heading text-lg transition-colors ${isLiked ? 'text-marker' : 'hover:text-marker'}`}
        >
          <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} strokeWidth={isLiked ? 0 : 2} className={isLiked ? "animate-jiggle" : ""} />
          <span>{post.likes.length}</span>
        </button>
        
        <button 
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 font-heading text-lg hover:text-pen transition-colors"
        >
          <MessageSquare size={20} strokeWidth={2} />
          <span>{post.comments.length}</span>
        </button>
      </div>

      {showComments && (
        <div className="mt-6 pt-6 border-t-[3px] border-pencil">
          {/* Comments List */}
          <div className="space-y-4 mb-6">
            {post.comments.map((comment) => (
              <div key={comment._id} className="flex gap-3 bg-muted/30 p-3 wobbly-sm border-2 border-pencil/20">
                <Link to={`/profile/${comment.user.username}`}>
                  <Avatar src={comment.user.avatar} initials={comment.user.name?.[0]} size="sm" />
                </Link>
                <div>
                  <div className="flex items-baseline gap-2">
                    <Link to={`/profile/${comment.user.username}`} className="font-heading hover:underline">
                      {comment.user.name}
                    </Link>
                    <span className="text-xs text-pencil/50">{formatDate(comment.createdAt)}</span>
                  </div>
                  <p className="font-body text-pencil text-sm mt-1">{comment.content}</p>
                </div>
              </div>
            ))}
            {post.comments.length === 0 && (
              <p className="text-center font-body text-pencil/50 text-sm">No comments yet. Be the first to sketch a reply!</p>
            )}
          </div>

          {/* Add Comment Form */}
          <form onSubmit={handleCommentSubmit} className="flex gap-2">
            <input
              type="text"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 bg-white border-2 border-pencil p-2 font-body focus:outline-none focus:border-pen wobbly-sm"
            />
            <Button type="submit" size="sm" isLoading={commentPending} disabled={!commentContent.trim()}>
              Reply
            </Button>
          </form>
        </div>
      )}
    </Card>
  );
}
