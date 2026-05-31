import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

export default function PageShell() {
  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <Navbar />
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </div>
    </div>
  );
}
