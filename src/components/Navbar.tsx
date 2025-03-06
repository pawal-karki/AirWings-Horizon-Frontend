import type React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plane, Map, Calendar, User, LogOut } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-hot-toast";
import PlaneIcon from "../assets/images/AirwingsLogoTransparent.svg";

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
      <div className="">
        <div className="h-32 flex items-center justify-between px-4 py-3">
          <div className="w-64 h-56 flex-shrink-0 flex-grow-0 relative mr-6">
            <Link to="/" className="absolute inset-0 flex items-center">
              <img
                src={PlaneIcon || "/placeholder.svg"}
                alt="Airwings Logo"
                className="max-h-full max-w-full object-contain"
              />
            </Link>
          </div>

          {/* Navigation Links Container - completely separate */}
          <div className="flex-1 flex justify-end">
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
                    label={
                      user?.role === "admin" ? "Admin Dashboard" : "Profile"
                    }
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
