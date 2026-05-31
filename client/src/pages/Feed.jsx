import { usePosts } from '../features/feed/useFeed';
import CreatePost from '../components/feed/CreatePost';
import PostCard from '../components/feed/PostCard';
import Sidebar from '../components/layout/Sidebar';
import Skeleton from '../components/ui/Skeleton';

export default function Feed() {
  const { data: posts, isLoading } = usePosts();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
      {/* Main Feed Column */}
      <div className="lg:col-span-2">
        <h1 className="text-4xl font-heading text-pencil mb-8">
          The Sketchpad ✏️
        </h1>
        
        <CreatePost />

        <div className="mt-10">
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="border-[3px] border-pencil p-6">
                  <div className="flex gap-4 mb-4">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-24 w-full mb-4" />
                  <Skeleton className="h-6 w-32" />
                </div>
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="space-y-6">
              {posts.map(post => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border-[3px] border-pencil border-dashed wobbly">
              <p className="font-heading text-2xl text-pencil/50 mb-2">It's awfully quiet here...</p>
              <p className="font-body text-pencil">Be the first to share a sketch!</p>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Column */}
      <div className="hidden lg:block lg:col-span-1 relative">
        <Sidebar />
      </div>
    </div>
  );
}
