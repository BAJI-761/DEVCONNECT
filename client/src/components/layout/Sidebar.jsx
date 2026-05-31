import { Link } from 'react-router-dom';
import { useSuggestedUsers, useFollowUser } from '../../features/profile/useProfile';
import { Card } from '../ui/Card';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Skeleton from '../ui/Skeleton';

export default function Sidebar() {
  const { data: suggestedUsers, isLoading } = useSuggestedUsers();
  const { mutate: followUser } = useFollowUser();

  if (isLoading) {
    return (
      <Card className="w-full">
        <Skeleton className="h-6 w-32 mb-6" />
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="h-4 w-24 flex-1" />
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card decoration="tack" className="w-full sticky top-24 bg-postit">
      <h3 className="font-heading text-xl mb-4 text-pencil border-b-2 border-dashed border-pencil pb-2">
        Devs to Follow
      </h3>
      
      {suggestedUsers && suggestedUsers.length > 0 ? (
        <div className="space-y-4">
          {suggestedUsers.map(user => (
            <div key={user._id} className="flex items-center justify-between group">
              <Link to={`/profile/${user.username}`} className="flex items-center gap-3 flex-1 min-w-0 mr-3">
                <Avatar src={user.avatar} initials={user.name?.[0]} size="sm" />
                <div className="truncate">
                  <p className="font-heading text-sm text-pencil truncate group-hover:underline decoration-wavy decoration-pen">{user.name}</p>
                  <p className="font-body text-xs text-pencil/60 truncate">@{user.username}</p>
                </div>
              </Link>
              <Button 
                variant="secondary" 
                size="sm" 
                className="h-8 px-3 text-xs shrink-0"
                onClick={() => followUser({ userId: user._id, action: 'follow' })}
              >
                Follow
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-pencil/60 font-body text-sm text-center py-4">
          No suggestions right now. Keep exploring!
        </p>
      )}

      <div className="mt-8 pt-4 border-t-2 border-dashed border-pencil/30 text-center text-xs text-pencil/50 font-body">
        <p>DevConnect &copy; 2026</p>
        <p className="mt-1">Built with imperfect pixels.</p>
      </div>
    </Card>
  );
}
