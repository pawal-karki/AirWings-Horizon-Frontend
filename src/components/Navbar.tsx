import type React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plane, Map, Calendar, User, LogOut } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-hot-toast";

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-dark_purple to-purple-900 text-honeydew shadow-md">
      <div className="container mx-auto px-4 py-9">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-naples_yellow/20 p-2 rounded-full group-hover:bg-naples_yellow/30 transition-colors">
              <Plane className="h-6 w-6 text-naples_yellow group-hover:rotate-12 transition-transform" />
            </div>
            <span className="text-xl font-bold tracking-wide">
              Airwings Horizon
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <NavLink
              to="/flights"
              icon={<Plane className="h-5 w-5" />}
              label="Flights"
            />
            <NavLink
              to="/destinations"
              icon={<Map className="h-5 w-5" />}
              label="Popular Destinations"
            />
            <NavLink
              to="/schedule"
              icon={<Calendar className="h-5 w-5" />}
              label="Schedule"
            />

            {isAuthenticated ? (
              <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-honeydew/20">
                <span className="text-sm text-naples_yellow font-medium">
                  Namaste, {user?.username}
                </span>

                <NavLink
                  to={user?.role === "admin" ? "/admin" : "/profile"}
                  icon={<User className="h-5 w-5" />}
                  label={user?.role === "admin" ? "Admin Dashboard" : "Profile"}
                />
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-honeydew/10 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 bg-naples_yellow text-dark_purple font-medium px-4 py-2 rounded-md hover:bg-naples_yellow/90 transition-colors"
              >
                <User className="h-5 w-5" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink: React.FC<{
  to: string;
  icon: React.ReactNode;
  label: string;
}> = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-honeydew/10 transition-colors"
  >
    {icon}
    <span>{label}</span>
  </Link>
);
