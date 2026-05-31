import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useLogout } from '../../features/auth/useAuth';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';
import NotificationDropdown from './NotificationDropdown';
import { LogOut, Home } from 'lucide-react';

export default function Navbar() {
  const user = useAuthStore((state) => state.user);
  const { mutate: logout } = useLogout();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 w-full bg-paper border-b-[3px] border-pencil shadow-hard-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-heading text-pencil decoration-wavy hover:underline decoration-marker decoration-2">
          <span>DevConnect</span>
          <span className="text-marker">✏️</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/feed" className="flex items-center gap-2 text-pencil hover:text-marker font-heading text-lg">
            <Home size={20} strokeWidth={2.5} />
            <span className="hidden md:inline">Feed</span>
          </Link>
          
          {user && <NotificationDropdown />}
          
          <div className="hidden md:block h-8 w-[3px] bg-pencil/20 -rotate-2 mx-2" />
          
          {user && (
            <Link to={`/profile/${user.username}`} className="flex items-center gap-3">
              <Avatar src={user.avatar} initials={user.name?.[0]} size="sm" />
              <span className="font-heading text-lg text-pencil">{user.name}</span>
            </Link>
          )}

          <Button variant="ghost" size="sm" onClick={() => logout(undefined, { onSuccess: () => navigate('/') })} className="ml-2 gap-2 text-marker hover:text-marker hover:bg-marker/10">
            <LogOut size={18} strokeWidth={2.5} />
            Logout
          </Button>
        </div>

        {/* Mobile menu button could go here */}
      </div>
    </nav>
  );
}
