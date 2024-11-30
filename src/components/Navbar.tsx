import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Map, Calendar, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const Navbar: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <nav className="bg-dark_purple text-honeydew p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Plane className="h-6 w-6" />
          <span className="text-xl font-bold">Airwings Horizon</span>
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link to="/flights" className="flex items-center space-x-1 hover:text-naples_yellow">
            <Plane className="h-5 w-5" />
            <span>Flights</span>
          </Link>
          
          <Link to="/destinations" className="flex items-center space-x-1 hover:text-naples_yellow">
            <Map className="h-5 w-5" />
            <span>Popular Destinations</span>
          </Link>
          
          <Link to="/schedule" className="flex items-center space-x-1 hover:text-naples_yellow">
            <Calendar className="h-5 w-5" />
            <span>Schedule</span>
          </Link>

          {isAuthenticated ? (
            <Link to={user?.role === 'admin' ? '/admin' : '/profile'} className="flex items-center space-x-1 hover:text-naples_yellow">
              <User className="h-5 w-5" />
              <span>{user?.role === 'admin' ? 'Admin Dashboard' : 'Profile'}</span>
            </Link>
          ) : (
            <Link to="/login" className="flex items-center space-x-1 hover:text-naples_yellow">
              <User className="h-5 w-5" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};