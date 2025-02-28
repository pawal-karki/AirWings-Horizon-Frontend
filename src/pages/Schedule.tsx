import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-hot-toast";
import axios from "axios";
import {
  Plane,
  Calendar,
  MapPin,
  Clock,
  AlertCircle,
  ArrowRight,
  Edit,
  Trash2,
  X,
  Check,
} from "lucide-react";

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
  const [visibleItems, setVisibleItems] = useState<number>(0);
  const { user } = useAuthStore();

  useEffect(() => {
    fetchSchedule();
  }, []);

  useEffect(() => {
    // Stagger the animation of schedule items
    const timer = setInterval(() => {
      setVisibleItems((prev) => {
        if (prev < schedule.length) {
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [schedule.length]);

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
      // Create a properly formatted request body
      const requestBody = {
        flight: editForm.flight,
        frequency: editForm.frequency,
        status: editForm.status,
        flight_details: {
          flight_id: editForm.flight_details.flight_id,
          airline: editForm.flight_details.airline,
          departure_city: editForm.flight_details.departure_city,
          arrival_city: editForm.flight_details.arrival_city,
        },
      };

      const response = await axios.put(
        `http://localhost:8000/api/schedule/${editForm.id}/`, // Note the trailing slash
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSchedule(
          schedule.map((item) =>
            item.id === editForm.id ? response.data : item
          )
        );
        setEditingId(null);
        setEditForm(null);
        toast.success("Schedule updated successfully");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error ||
          error.response?.data?.detail ||
          "Failed to update schedule. Please try again.";
        console.error("Error updating schedule:", errorMessage);
        toast.error(errorMessage);
      } else {
        console.error("Error updating schedule:", error);
        toast.error("An unexpected error occurred while updating the schedule");
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this schedule?")) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:8000/api/schedule/${id}/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 204) {
        setSchedule(schedule.filter((item) => item.id !== id));
        toast.success("Schedule deleted successfully");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error ||
          error.response?.data?.detail ||
          "Failed to delete schedule. Please try again.";
        console.error("Error deleting schedule:", errorMessage);
        toast.error(errorMessage);
      } else {
        console.error("Error deleting schedule:", error);
        toast.error("An unexpected error occurred while deleting the schedule");
      }
    }
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Check className="w-4 h-4 mr-1" />;
      case "delayed":
        return <Clock className="w-4 h-4 mr-1" />;
      default:
        return <X className="w-4 h-4 mr-1" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Plane
                className="w-8 h-8 mr-3 text-blue-600 animate-float"
                style={{ animationDuration: "4s" }}
              />
              Flight Schedule
            </h1>
            <p
              className="mt-2 text-sm text-gray-600 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Manage and monitor flight schedules across all destinations
            </p>
          </div>
          <div
            className="flex items-center space-x-4 mt-4 md:mt-0 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <span className="flex items-center px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full hover-scale">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse-soft"></div>
              Active
            </span>
            <span className="flex items-center px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full hover-scale">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse-soft"></div>
              Delayed
            </span>
            <span className="flex items-center px-3 py-1 text-sm bg-red-100 text-red-800 rounded-full hover-scale">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse-soft"></div>
              Cancelled
            </span>
          </div>
        </div>

        <div
          className="bg-white rounded-lg shadow-lg overflow-hidden animate-fade-in-up"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="grid gap-6 p-6">
            {schedule.length === 0 && (
              <div className="text-center py-12 animate-fade-in">
                <AlertCircle className="w-12 h-12 mx-auto text-gray-400 mb-4 animate-pulse-soft" />
                <h3 className="text-lg font-medium text-gray-900">
                  No schedules found
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Schedules will appear here once they are added.
                </p>
              </div>
            )}

            {schedule.map((item, index) => (
              <div
                key={item.id}
                className={`bg-white border rounded-lg shadow-sm transition-all duration-300 hover:shadow-md ${
                  index < visibleItems
                    ? "animate-slide-up opacity-100"
                    : "opacity-0"
                } ${
                  editingId === item.id
                    ? "ring-2 ring-blue-500 ring-opacity-50"
                    : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Plane className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Flight {item.flight_details.flight_id}
                      </h3>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full border flex items-center ${getStatusColor(
                        item.status
                      )} transition-all duration-300 hover-scale`}
                    >
                      {getStatusIcon(item.status)}
                      <span>
                        {item.status.charAt(0).toUpperCase() +
                          item.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="flex items-start space-x-3 group">
                      <MapPin className="w-5 h-5 text-gray-400 mt-1 group-hover:text-blue-500 transition-colors duration-300 group-hover:animate-bounce-subtle" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Route
                        </p>
                        <p className="text-sm text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                          {item.flight_details.departure_city}
                          <ArrowRight className="inline-block w-3 h-3 mx-1 animate-bounce-right" />
                          {item.flight_details.arrival_city}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 group">
                      <Calendar className="w-5 h-5 text-gray-400 mt-1 group-hover:text-blue-500 transition-colors duration-300" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Frequency
                        </p>
                        <p className="text-sm text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                          {item.frequency}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 group">
                      <Plane
                        className="w-5 h-5 text-gray-400 mt-1 group-hover:text-blue-500 transition-colors duration-300 group-hover:animate-float"
                        style={{ animationDuration: "3s" }}
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Airline
                        </p>
                        <p className="text-sm text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                          {item.flight_details.airline}
                        </p>
                      </div>
                    </div>

                    {user?.role === "admin" && (
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="inline-flex items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="inline-flex items-center px-4 py-2 border border-red-600 text-sm font-medium rounded-md text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {editingId === item.id && editForm && (
                  <div className="border-t bg-gray-50 p-6 animate-fade-in-up">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div
                        className="animate-fade-in-up"
                        style={{ animationDelay: "0.1s" }}
                      >
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
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-300"
                        />
                      </div>

                      <div
                        className="animate-fade-in-up"
                        style={{ animationDelay: "0.2s" }}
                      >
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
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-300"
                        />
                      </div>

                      <div
                        className="animate-fade-in-up"
                        style={{ animationDelay: "0.3s" }}
                      >
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
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-300"
                        />
                      </div>

                      <div
                        className="animate-fade-in-up"
                        style={{ animationDelay: "0.4s" }}
                      >
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
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-300"
                        />
                      </div>

                      <div
                        className="animate-fade-in-up"
                        style={{ animationDelay: "0.5s" }}
                      >
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
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-300"
                        />
                      </div>

                      <div
                        className="animate-fade-in-up"
                        style={{ animationDelay: "0.6s" }}
                      >
                        <label className="block text-sm font-medium text-gray-700">
                          Status
                        </label>
                        <select
                          value={editForm.status}
                          onChange={(e) =>
                            setEditForm({ ...editForm, status: e.target.value })
                          }
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-all duration-300"
                        >
                          <option value="active">Active</option>
                          <option value="delayed">Delayed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <div
                      className="mt-6 flex justify-end space-x-3 animate-fade-in-up"
                      style={{ animationDelay: "0.7s" }}
                    >
                      <button
                        onClick={handleCancel}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {schedule.length > 0 && (
          <div
            className="mt-8 bg-blue-50 rounded-lg shadow-md p-6 animate-float"
            style={{ animationDuration: "5s" }}
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-4 md:mb-0 md:mr-6">
                <Plane
                  className="w-12 h-12 text-blue-600 animate-float"
                  style={{ animationDuration: "3s" }}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Need to update flight information?
                </h3>
                <p className="text-gray-600">
                  Our scheduling system allows for real-time updates to keep
                  passengers informed about any changes.
                </p>
              </div>
              <div className="mt-4 md:mt-0 md:ml-auto">
                <button className="inline-flex items-center px-5 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                  <span>View Flight Status</span>
                  <ArrowRight className="ml-2 h-4 w-4 animate-bounce-right" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;
