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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 bg-grid-indigo-100/[0.2] bg-[size:20px_20px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-indigo-100/50 p-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 z-0" />

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              <div className="h-16 w-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <UserCog className="h-8 w-8 text-white" />
              </div>
            </motion.div>

            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 text-center">
              Join Airwings Horizon
            </h2>
            <p className="text-gray-500 text-center mb-8">
              Create your account to get started
            </p>

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md"
              >
                <p className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error}
                </p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" />
                  </div>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    className="pl-10 w-full p-3 bg-white/70 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                    placeholder="Choose a username"
                    required
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="pl-10 w-full p-3 bg-white/70 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" />
                  </div>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={handlePasswordChange}
                    className="pl-10 w-full p-3 bg-white/70 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
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

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Type
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Shield className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" />
                  </div>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        role: e.target.value as "user" | "admin",
                      })
                    }
                    className="pl-10 w-full p-3 bg-white/70 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm appearance-none"
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

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pt-2"
              >
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg shadow-indigo-500/30 transition-all duration-200 flex items-center justify-center"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="ml-2 h-5 w-5 animate-pulse" />
                    </>
                  )}
                </button>
              </motion.div>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-center"
            >
              <p className="text-gray-600">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                >
                  Login
                </a>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 pt-4 border-t border-gray-200"
            >
              <p className="text-xs text-center text-gray-500">
                By creating an account, you agree to our{" "}
                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                  Privacy Policy
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
