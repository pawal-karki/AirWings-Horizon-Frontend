"use client";

import React, { useState } from "react";
import { Bell, User } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { StatsOverview } from "./adminComponents/StatsOverview";
import { TabNavigation } from "./adminComponents/TabNavigations";
import { FlightsTab } from "./adminComponents/FlightTab";
import { AddFlightTab } from "./adminComponents/AddFlightTab";
import { BookingsTab } from "./adminComponents/BookingTab";

export const AdminDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "bookings" | "flights" | "schedule" | "add-flight"
  >("bookings");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Redirect if not admin
  React.useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="mt-1 text-gray-600">
                Manage flights, bookings, and schedules
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-500 hover:text-indigo-600 cursor-pointer transition-colors" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </div>
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="h-10 w-10 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                  <User className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-gray-700">Admin</span>
              </div>
            </div>
          </div>
        </header>

        <StatsOverview />

        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <TabNavigation
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>

          {activeTab === "flights" ? (
            <FlightsTab />
          ) : activeTab === "add-flight" ? (
            <AddFlightTab />
          ) : activeTab === "bookings" ? (
            <BookingsTab />
          ) : (
            <div className="p-6 text-center text-gray-500">
              {activeTab === "schedule" ? (
                <p>Schedule management content will be displayed here.</p>
              ) : (
                <p>Content will be displayed here.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
