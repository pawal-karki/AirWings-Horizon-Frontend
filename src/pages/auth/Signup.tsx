"use client";

import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  User,
  Lock,
  Mail,
  UserCog,
  Loader2,
  ArrowRight,
  CheckCircle,
  Shield,
  AlertCircle,
  UserPlus,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { motion } from "framer-motion";

// Base API URL
const API_BASE_URL = "http://localhost:8000/api/auth";

export const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user" as "user" | "admin",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  // Check password strength
  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setFormData({ ...formData, password: newPassword });
    checkPasswordStrength(newPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/register/`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      // // Destructure response data
      // const { token, username, role } = response.data;

      // // Update auth store
      // setUser({
      //   username,
      //   role,
      //   token,
      // });

      // // Set token in axios default headers
      // axios.defaults.headers.common["Authorization"] = `Token ${token}`;

      // Redirect to login or home page
      navigate("/login");
    } catch (err: any) {
      // Handle signup errors
      if (err.response) {
        setError(
          err.response.data.message || "Signup failed. Please try again."
        );
      } else if (err.request) {
        setError("No response from server. Please check your connection.");
      } else {
        setError("Error during signup. Please try again.");
      }
      console.error("Signup error:", err);
      setIsLoading(false);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength === 0) return "bg-gray-200";
    if (passwordStrength === 1) return "bg-red-500";
    if (passwordStrength === 2) return "bg-yellow-500";
    if (passwordStrength === 3) return "bg-blue-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (formData.password.length === 0) return "";
    if (passwordStrength === 1) return "Weak";
    if (passwordStrength === 2) return "Fair";
    if (passwordStrength === 3) return "Good";
    return "Strong";
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-12">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzODhCRjciIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djI2aDI0di0yNkgzNnpNMTIgNjBoMjRWMzRIMTJ2MjZ6TTAgMzRoMTJ2MjZIMFYzNHpNMTIgMHYzNGgyNFYwSDEyek0wIDBoMTJ2MzRIMFYwek0zNiAwdjM0aDI0VjBIMzZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] bg-[size:60px_60px] opacity-10 pointer-events-none" />

      {/* Content container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
        <div className="flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl">
          {/* Left side - Image/Brand */}
          <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
            {/* Full background image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1507812984078-917a274065be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')",
              }}
            ></div>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/60"></div>

            <div className="relative z-10 h-full p-12 flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-4">
                  Airwings Horizon
                </h1>
                <p className="text-blue-100 text-lg">
                  Join our aviation platform and take flight
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <CheckIcon className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-white">
                    Create your personalized dashboard
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <CheckIcon className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-white">Access detailed flight analytics</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <CheckIcon className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-white">Unlock premium features</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Signup form */}
          <div className="w-full lg:w-1/2 bg-white p-8 sm:p-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-md mx-auto"
            >
              <div className="flex items-center justify-center space-x-2 mb-8 lg:mb-12">
                <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                  <UserPlus className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Create Your Account
                </h2>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-start"
                >
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <motion.div variants={itemVariants} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                    </div>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                      className="pl-10 w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Choose a username"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="pl-10 w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                    </div>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={handlePasswordChange}
                      className="pl-10 w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Create a password"
                      required
                    />
                  </div>
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-xs font-medium text-gray-500">
                          Password strength:
                        </div>
                        <div
                          className="text-xs font-medium"
                          style={{
                            color:
                              passwordStrength >= 3
                                ? "#10B981"
                                : passwordStrength >= 2
                                ? "#3B82F6"
                                : "#F59E0B",
                          }}
                        >
                          {getStrengthText()}
                        </div>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getStrengthColor()} transition-all duration-300 ease-in-out`}
                          style={{ width: `${passwordStrength * 25}%` }}
                        ></div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="flex items-center text-xs text-gray-500">
                          <CheckCircle
                            className={`h-3.5 w-3.5 mr-1 ${
                              formData.password.length >= 8
                                ? "text-green-500"
                                : "text-gray-300"
                            }`}
                          />
                          <span>8+ characters</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <CheckCircle
                            className={`h-3.5 w-3.5 mr-1 ${
                              /[A-Z]/.test(formData.password)
                                ? "text-green-500"
                                : "text-gray-300"
                            }`}
                          />
                          <span>Uppercase letter</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <CheckCircle
                            className={`h-3.5 w-3.5 mr-1 ${
                              /[0-9]/.test(formData.password)
                                ? "text-green-500"
                                : "text-gray-300"
                            }`}
                          />
                          <span>Number</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <CheckCircle
                            className={`h-3.5 w-3.5 mr-1 ${
                              /[^A-Za-z0-9]/.test(formData.password)
                                ? "text-green-500"
                                : "text-gray-300"
                            }`}
                          />
                          <span>Special character</span>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Account Type
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Shield className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                    </div>
                    <select
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          role: e.target.value as "user" | "admin",
                        })
                      }
                      className="pl-10 w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none"
                    >
                      <option value="user">Regular User</option>
                      <option value="admin">Administrator</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg shadow-blue-500/30 transition-all duration-200 flex items-center justify-center"
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    ) : (
                      <>
                        <span>Create Account</span>
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </button>
                </motion.div>
              </form>

              <motion.div variants={itemVariants} className="mt-6 text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    Login
                  </a>
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mt-8 pt-4 border-t border-gray-200"
              >
                <p className="text-xs text-center text-gray-500">
                  By creating an account, you agree to our{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </a>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for the checkmarks
const CheckIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);
