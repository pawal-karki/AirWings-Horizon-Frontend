"use client";

import type React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plane, Map, Calendar, User, LogOut, Menu, X } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-hot-toast";
import PlaneIcon from "../assets/images/AirwingsLogoTransparent.svg";

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-dark_purple to-purple-900 text-honeydew shadow-md">
      <div className="relative">
        <div className="flex items-center justify-between px-4 py-3 md:h-32">
          {/* Logo - responsive sizing */}
          <div className="w-32 h-16 md:w-64 md:h-56 flex-shrink-0 flex-grow-0 relative md:mr-6">
            <Link to="/" className="absolute inset-0 flex items-center">
              <img
                src={PlaneIcon || "/placeholder.svg"}
                alt="Airwings Logo"
                className="max-h-full max-w-full object-contain"
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-honeydew/10 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:flex-1 md:justify-end">
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

        {/* Mobile Navigation Menu */}
        <div
          className={`absolute top-full left-0 right-0 bg-dark_purple shadow-lg z-50 transition-all duration-300 ease-in-out md:hidden ${
            isMenuOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-4 py-2 space-y-3">
            <MobileNavLink
              to="/flights"
              icon={<Plane className="h-5 w-5" />}
              label="Flights"
              onClick={() => setIsMenuOpen(false)}
            />
            <MobileNavLink
              to="/destinations"
              icon={<Map className="h-5 w-5" />}
              label="Popular Destinations"
              onClick={() => setIsMenuOpen(false)}
            />
            <MobileNavLink
              to="/schedule"
              icon={<Calendar className="h-5 w-5" />}
              label="Schedule"
              onClick={() => setIsMenuOpen(false)}
            />

            <div className="border-t border-honeydew/10 my-3 pt-3">
              {isAuthenticated ? (
                <>
                  <div className="text-sm text-naples_yellow font-medium py-2">
                    Namaste, {user?.username}
                  </div>
                  <MobileNavLink
                    to={user?.role === "admin" ? "/admin" : "/profile"}
                    icon={<User className="h-5 w-5" />}
                    label={
                      user?.role === "admin" ? "Admin Dashboard" : "Profile"
                    }
                    onClick={() => setIsMenuOpen(false)}
                  />
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full py-3 px-2 rounded-md hover:bg-honeydew/10 transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center justify-center space-x-2 bg-naples_yellow text-dark_purple font-medium px-4 py-3 rounded-md hover:bg-naples_yellow/90 transition-colors w-full"
                  onClick={() => setIsMenuOpen(false)}
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

const MobileNavLink: React.FC<{
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}> = ({ to, icon, label, onClick }) => (
  <Link
    to={to}
    className="flex items-center space-x-2 py-3 px-2 rounded-md hover:bg-honeydew/10 transition-colors"
    onClick={onClick}
  >
    {icon}
    <span className="text-base">{label}</span>
  </Link>
);
