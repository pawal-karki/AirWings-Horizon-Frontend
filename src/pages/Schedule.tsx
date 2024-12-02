import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Plane, Calendar, MapPin, Clock, AlertCircle } from "lucide-react";

interface FlightDetails {
  flight_id: string;
  airline: string;
  departure_city: string;
  arrival_city: string;
}

interface ScheduleItem {
  id: number;
  flight: number;
  frequency: string;
  status: string;
  flight_details: FlightDetails;
}

const Schedule: React.FC = () => {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<ScheduleItem | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      const response = await axios.get<ScheduleItem[]>(
        "http://localhost:8000/api/schedule"
      );
      setSchedule(response.data);
    } catch (error) {
      console.error("Error fetching schedule:", error);
      toast.error("Failed to fetch schedule");
    }
  };

  const handleEdit = (item: ScheduleItem) => {
    setEditingId(item.id);
    setEditForm({ ...item });
  };

  const handleSave = async () => {
    if (!editForm) return;

    try {
      await axios.put(
        `http://localhost:8000/api/schedule/${editForm.id}`,
        editForm
      );
      setSchedule(
        schedule.map((item) => (item.id === editForm.id ? editForm : item))
      );
      setEditingId(null);
      setEditForm(null);
      toast.success("Schedule updated successfully");
    } catch (error) {
      console.error("Error updating schedule:", error);
      toast.error("Failed to update schedule");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "delayed":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-red-100 text-red-800 border-red-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Flight Schedule
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage and monitor flight schedules
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Active
            </span>
            <span className="flex items-center px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
              Delayed
            </span>
            <span className="flex items-center px-3 py-1 text-sm bg-red-100 text-red-800 rounded-full">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
              Cancelled
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="grid gap-6 p-6">
            {schedule.map((item) => (
              <div
                key={item.id}
                className="bg-white border rounded-lg shadow-sm"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Plane className="w-6 h-6 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Flight {item.flight_details.flight_id}
                      </h3>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full border ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Route
                        </p>
                        <p className="text-sm text-gray-900">
                          {item.flight_details.departure_city} →{" "}
                          {item.flight_details.arrival_city}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Frequency
                        </p>
                        <p className="text-sm text-gray-900">
                          {item.frequency}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Plane className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Airline
                        </p>
                        <p className="text-sm text-gray-900">
                          {item.flight_details.airline}
                        </p>
                      </div>
                    </div>

                    {/* Only show the edit button if the user is an admin */}
                    {user?.role === "admin" && (
                      <div className="flex items-center justify-end">
                        <button
                          onClick={() => handleEdit(item)}
                          className="inline-flex items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Edit Details
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {editingId === item.id && editForm && (
                  <div className="border-t bg-gray-50 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Flight ID
                        </label>
                        <input
                          type="text"
                          value={editForm.flight_details.flight_id}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              flight_details: {
                                ...editForm.flight_details,
                                flight_id: e.target.value,
                              },
                            })
                          }
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Airline
                        </label>
                        <input
                          type="text"
                          value={editForm.flight_details.airline}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              flight_details: {
                                ...editForm.flight_details,
                                airline: e.target.value,
                              },
                            })
                          }
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Departure City
                        </label>
                        <input
                          type="text"
                          value={editForm.flight_details.departure_city}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              flight_details: {
                                ...editForm.flight_details,
                                departure_city: e.target.value,
                              },
                            })
                          }
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Arrival City
                        </label>
                        <input
                          type="text"
                          value={editForm.flight_details.arrival_city}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              flight_details: {
                                ...editForm.flight_details,
                                arrival_city: e.target.value,
                              },
                            })
                          }
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Frequency
                        </label>
                        <input
                          type="text"
                          value={editForm.frequency}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              frequency: e.target.value,
                            })
                          }
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Status
                        </label>
                        <select
                          value={editForm.status}
                          onChange={(e) =>
                            setEditForm({ ...editForm, status: e.target.value })
                          }
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        >
                          <option value="active">Active</option>
                          <option value="delayed">Delayed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        onClick={handleCancel}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
