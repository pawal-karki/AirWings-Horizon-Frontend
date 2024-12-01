import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import axios from "axios";
const API_BASE_URL = "http://localhost:8000/api/auth";

export const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${API_BASE_URL}/login/`, {
        username,
        password,
      });

      // Destructure response data
      const { token, username: loggedUsername, role } = response.data;

      // Update auth store
      setUser({
        username: loggedUsername,
        role,
        token,
      });

      // Set token in axios default headers
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;

      // Redirect to home page
      navigate("/");
    } catch (err: any) {
      // Handle login errors
      if (err.response) {
        setError(
          err.response.data.message ||
            "Login failed. Please check your credentials."
        );
      } else if (err.request) {
        setError("No response from server. Please check your connection.");
      } else {
        setError("Error during login. Please try again.");
      }
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-honeydew flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-dark_purple mb-6 text-center">
          Login to Airwings Horizon
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-dark_purple focus:border-transparent"
                placeholder="Enter your username"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-dark_purple focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-dark_purple text-honeydew py-3 rounded-md hover:bg-dark_purple-900 transition-colors"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-dark_purple hover:text-dark_purple-900"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};
