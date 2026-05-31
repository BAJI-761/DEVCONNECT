import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useNotifications, useMarkNotificationsRead, useSocket } from '../../features/notifications/useNotifications';
import Avatar from '../ui/Avatar';
import { Bell, Heart, MessageSquare, UserPlus } from 'lucide-react';
import { formatTimeAgo } from '../../lib/formatDate';

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { data: notifications } = useNotifications();
  const { mutate: markAsRead } = useMarkNotificationsRead();
  const socket = useSocket();
  const queryClient = useQueryClient();

  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  // Listen for real-time notifications
  useEffect(() => {
    if (!socket) return;
    
    const handleNewNotification = (notification) => {
      // Update cache optimistically
      queryClient.setQueryData(['notifications'], (old) => {
        return old ? [notification, ...old] : [notification];
      });
    };

    socket.on('newNotification', handleNewNotification);
    return () => socket.off('newNotification', handleNewNotification);
  }, [socket, queryClient]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen && unreadCount > 0) {
      markAsRead();
    }
  };

  const getIcon = (type) => {
    switch(type) {
      case 'like': return <Heart size={16} className="text-marker" fill="currentColor" />;
      case 'comment': return <MessageSquare size={16} className="text-pen" />;
      case 'follow': return <UserPlus size={16} className="text-pencil" />;
      default: return null;
    }
  };

  const getMessage = (notification) => {
    switch(notification.type) {
      case 'like': return 'liked your sketch';
      case 'comment': return 'commented on your sketch';
      case 'follow': return 'started following you';
      default: return 'interacted with you';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={handleToggle}
        className="flex items-center gap-2 text-pencil hover:text-marker font-heading text-lg relative outline-none"
      >
        <Bell size={20} strokeWidth={2.5} className={unreadCount > 0 ? "animate-jiggle" : ""} />
        <span className="hidden md:inline">Notifications</span>
        
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-marker text-white rounded-full text-[10px] flex items-center justify-center font-body border-2 border-paper">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-4 w-80 sm:w-96 bg-white border-[3px] border-pencil shadow-hard-lg wobbly z-50 max-h-[80vh] overflow-y-auto">
          <div className="p-3 border-b-2 border-pencil border-dashed bg-postit/20">
            <h3 className="font-heading text-lg text-pencil">Your Updates</h3>
          </div>
          
          <div className="divide-y divide-pencil/20">
            {notifications && notifications.length > 0 ? (
              notifications.map((notif) => (
                <div key={notif._id} className={`p-4 flex gap-3 hover:bg-muted/30 transition-colors ${!notif.read ? 'bg-marker/5' : ''}`}>
                  <Link to={`/profile/${notif.sender.username}`} onClick={() => setIsOpen(false)}>
                    <Avatar src={notif.sender.avatar} initials={notif.sender.name?.[0]} size="sm" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm text-pencil">
                      <Link to={`/profile/${notif.sender.username}`} className="font-bold hover:underline" onClick={() => setIsOpen(false)}>
                        {notif.sender.name}
                      </Link>
                      {' '}{getMessage(notif)}
                    </p>
                    <span className="text-xs text-pencil/50 flex items-center gap-1 mt-1">
                      {getIcon(notif.type)} {formatTimeAgo(notif.createdAt)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-pencil/60 font-body text-sm">
                No notifications yet. Go draw something!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
