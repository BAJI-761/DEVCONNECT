import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthGuard, GuestGuard } from './features/auth/AuthGuard';
import { useCurrentUser } from './features/auth/useAuth';
import PageShell from './components/layout/PageShell';
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Feed from './pages/Feed';
import { Toaster } from 'react-hot-toast';

function App() {
  // Try to fetch current user on app load
  useCurrentUser();

  return (
    <>
      <Toaster 
        position="bottom-right"
        toastOptions={{
          className: 'border-[3px] border-pencil shadow-hard wobbly-sm bg-white font-body text-pencil',
          style: {
            borderRadius: '0',
          },
        }}
      />
      <Routes>
      {/* Public route */}
      <Route path="/" element={<Landing />} />

      {/* Guest Only routes */}
      <Route element={<GuestGuard />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected routes wrapped in PageShell */}
      <Route element={<AuthGuard />}>
        <Route element={<PageShell />}>
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/profile/:username" element={<Profile />} />
          {/* We will add more protected routes here in future phases */}
        </Route>
      </Route>
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  );
}

export default App;
