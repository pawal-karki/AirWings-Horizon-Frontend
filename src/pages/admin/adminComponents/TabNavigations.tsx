"use client";

import type React from "react";
import { Search } from "lucide-react";

interface TabNavigationProps {
  activeTab: "bookings" | "flights" | "schedule" | "add-flight";
  setActiveTab: (
    tab: "bookings" | "flights" | "schedule" | "add-flight"
  ) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-6">
      <div className="flex space-x-4 mb-4 sm:mb-0">
        <button
          onClick={() => setActiveTab("bookings")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "bookings"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Bookings
        </button>
        <button
          onClick={() => setActiveTab("flights")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "flights"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Flights
        </button>
        <button
          onClick={() => setActiveTab("schedule")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "schedule"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Schedule
        </button>
        <button
          onClick={() => setActiveTab("add-flight")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "add-flight"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Add Flight
        </button>
      </div>
      {activeTab !== "flights" && (
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      )}
    </div>
  );
};
