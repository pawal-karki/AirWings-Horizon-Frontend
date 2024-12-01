import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User, Lock, Mail, UserCog } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

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
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${API_BASE_URL}/register/`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      // Destructure response data
      const { token, username, role } = response.data;

      // Update auth store
      setUser({
        username,
        role,
        token,
      });

      // Set token in axios default headers
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;

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
    }
  };

  return (
    <div className="min-h-screen bg-honeydew flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-dark_purple mb-6 text-center">
          Create an Account
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-dark_purple focus:border-transparent"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-dark_purple focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-dark_purple focus:border-transparent"
                placeholder="Create a password"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Type
            </label>
            <div className="relative">
              <UserCog className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role: e.target.value as "user" | "admin",
                  })
                }
                className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-dark_purple focus:border-transparent"
              >
                <option value="user">Regular User</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-dark_purple text-honeydew py-3 rounded-md hover:bg-dark_purple-900 transition-colors"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-dark_purple hover:text-dark_purple-900"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};
