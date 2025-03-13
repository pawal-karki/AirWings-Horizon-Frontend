import type React from "react";
import { Users, Plane, Calendar } from "lucide-react";

export const StatsOverview: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 bg-indigo-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Total Bookings</p>
              <p className="text-3xl font-bold mt-1">156</p>
            </div>
            <div className="h-12 w-12 bg-indigo-500 bg-opacity-30 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="px-6 py-3 bg-indigo-50">
          <p className="text-xs text-indigo-600 font-medium">
            <span className="text-green-600">↑ 12%</span> from last month
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 bg-amber-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Active Flights</p>
              <p className="text-3xl font-bold mt-1">24</p>
            </div>
            <div className="h-12 w-12 bg-amber-400 bg-opacity-30 rounded-lg flex items-center justify-center">
              <Plane className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="px-6 py-3 bg-amber-50">
          <p className="text-xs text-amber-600 font-medium">
            <span className="text-green-600">↑ 8%</span> from yesterday
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 bg-gray-700 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Today's Flights</p>
              <p className="text-3xl font-bold mt-1">12</p>
            </div>
            <div className="h-12 w-12 bg-gray-600 bg-opacity-30 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="px-6 py-3 bg-gray-50">
          <p className="text-xs text-gray-600 font-medium">
            <span className="text-red-600">↓ 3%</span> from last week
          </p>
        </div>
      </div>
    </div>
  );
};
