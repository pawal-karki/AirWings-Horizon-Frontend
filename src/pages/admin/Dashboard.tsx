"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Plane,
  Calendar,
  ChevronDown,
  ChevronUp,
  Search,
  Bell,
  User,
  Filter,
  RefreshCw,
  Trash,
  Edit,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { Bookings } from "../../components/Bookings";

interface BookingInfo {
  id: string;
  passengerName: string;
  flightNumber: string;
  date: string;
  status: "confirmed" | "pending" | "cancelled";
}

interface FlightFormData {
  flight_id: string;
  airline: string;
  departure: {
    airport: string;
    code: string;
    city: string;
    country: string;
    date: string;
    time: string;
  };
  arrival: {
    airport: string;
    code: string;
    city: string;
    country: string;
    date: string;
    time: string;
  };
  price: number;
  available_seats: number;
}

interface Flight {
  id: number;
  flight_id: string;
  airline: string;
  departure_airport: string;
  departure_code: string;
  departure_city: string;
  departure_country: string;
  departure_date: string;
  departure_time: string;
  arrival_airport: string;
  arrival_code: string;
  arrival_city: string;
  arrival_country: string;
  arrival_date: string;
  arrival_time: string;
  price: string;
  available_seats: number;
}

const mockBookings: BookingInfo[] = [
  {
    id: "1",
    passengerName: "John Doe",
    flightNumber: "AH101",
    date: "2024-03-20",
    status: "confirmed",
  },
  {
    id: "2",
    passengerName: "Jane Smith",
    flightNumber: "AH102",
    date: "2024-03-21",
    status: "pending",
  },
];

// List of airlines for the dropdown
const airlines = [
  "Nepal Airlines",
  "Buddha Air",
  "Yeti Airlines",
  "Saurya Airlines",
];

// List of airports for dropdowns
const airports = [
  {
    name: "Tribhuvan International Airport",
    code: "KTM",
    city: "Kathmandu",
    country: "Nepal",
  },
  {
    name: "Pokhara International Airport",
    code: "PKR",
    city: "Pokhara",
    country: "Nepal",
  },
  { name: "Lukla Airport", code: "LUA", city: "Lukla", country: "Nepal" },
  {
    name: "Biratnagar Airport",
    code: "BIR",
    city: "Biratnagar",
    country: "Nepal",
  },
  {
    name: "Nepalgunj Airport",
    code: "KEP",
    city: "Nepalgunj",
    country: "Nepal",
  },
  {
    name: "Bharatpur Airport",
    code: "BHR",
    city: "Bharatpur",
    country: "Nepal",
  },
  { name: "Simara Airport", code: "SIF", city: "Simara", country: "Nepal" },
  { name: "Jomsom Airport", code: "JMO", city: "Jomsom", country: "Nepal" },
  { name: "Surkhet Airport", code: "SKH", city: "Surkhet", country: "Nepal" },
  { name: "Janakpur Airport", code: "JKR", city: "Janakpur", country: "Nepal" },
  {
    name: "Tumlingtar Airport",
    code: "TMI",
    city: "Tumlingtar",
    country: "Nepal",
  },
];

export const AdminDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "bookings" | "flights" | "schedule" | "add-flight"
  >("bookings");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });

  // Flights state
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loadingFlights, setLoadingFlights] = useState<boolean>(true);
  const [flightsError, setFlightsError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<keyof Flight>("departure_date");
  const [flightSortOrder, setFlightSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterAirline, setFilterAirline] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Initial state for the flight form
  const initialFlightFormData: FlightFormData = {
    flight_id: "",
    airline: airlines[0],
    departure: {
      airport: airports[0].name,
      code: airports[0].code,
      city: airports[0].city,
      country: airports[0].country,
      date: "",
      time: "",
    },
    arrival: {
      airport: "",
      code: "",
      city: "",
      country: "Nepal",
      date: "",
      time: "",
    },
    price: 0,
    available_seats: 0,
  };

  const [flightFormData, setFlightFormData] = useState<FlightFormData>(
    initialFlightFormData
  );

  // Redirect if not admin
  React.useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch flights data
  const fetchFlights = async () => {
    setLoadingFlights(true);
    try {
      const response = await fetch("http://localhost:8000/api/flights/");
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setFlights(data);
      setTotalPages(Math.ceil(data.length / itemsPerPage));
      setFlightsError(null);
    } catch (err) {
      setFlightsError("Failed to fetch flights. Please try again later.");
      console.error("Error fetching flights:", err);
    } finally {
      setLoadingFlights(false);
    }
  };

  useEffect(() => {
    if (activeTab === "flights") {
      fetchFlights();
    }
  }, [activeTab]);

  // Update total pages when items per page changes
  useEffect(() => {
    if (flights.length > 0) {
      setTotalPages(Math.ceil(flights.length / itemsPerPage));
    }
  }, [flights.length, itemsPerPage]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Handle sort for flights table
  const handleSort = (field: keyof Flight) => {
    if (sortField === field) {
      setFlightSortOrder(flightSortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setFlightSortOrder("asc");
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format time for display
  const formatTime = (timeString: string) => {
    // If timeString is already in HH:MM:SS format, just return the HH:MM part
    if (timeString.includes(":")) {
      return timeString.substring(0, 5);
    }

    // Otherwise, assume it's a date string and extract the time
    const date = new Date(timeString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFlightFormData((prev) => ({
        ...prev,
        [parent]: {
          [child]: value,
        },
      }));
    } else {
      setFlightFormData((prev) => ({
        ...prev,
        [name]:
          name === "price" || name === "available_seats"
            ? Number(value)
            : value,
      }));
    }
  };

  // Handle airport selection
  const handleAirportChange = (
    type: "departure" | "arrival",
    airportCode: string
  ) => {
    const selectedAirport = airports.find(
      (airport) => airport.code === airportCode
    );
    if (selectedAirport) {
      setFlightFormData((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          airport: selectedAirport.name,
          code: selectedAirport.code,
          city: selectedAirport.city,
          country: selectedAirport.country,
        },
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage({ type: "", text: "" });

    try {
      // Format dates for API
      const formattedData = {
        ...flightFormData,
        departure: {
          ...flightFormData.departure,
          date: `${flightFormData.departure.date}T${flightFormData.departure.time}:00`,
        },
        arrival: {
          ...flightFormData.arrival,
          date: `${flightFormData.arrival.date}T${flightFormData.arrival.time}:00`,
        },
      };

      // Send data to API
      const response = await fetch(
        "http://localhost:8000/api/flights/add_flights/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ flights: [formattedData] }),
        }
      );

      if (response.ok) {
        setSubmitMessage({
          type: "success",
          text: "Flight added successfully!",
        });
        setFlightFormData(initialFlightFormData);
        // Refresh flights list if we're on the flights tab
        if (activeTab === "flights") {
          fetchFlights();
        }
      } else {
        const errorData = await response.json();
        setSubmitMessage({
          type: "error",
          text: errorData.message || "Failed to add flight. Please try again.",
        });
      }
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text: "An error occurred. Please check your connection and try again.",
      });
      console.error("Error adding flight:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate a random flight ID
  const generateFlightId = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetter1 = letters[Math.floor(Math.random() * letters.length)];
    const randomLetter2 = letters[Math.floor(Math.random() * letters.length)];
    const randomNumber = Math.floor(Math.random() * 90) + 10;
    const randomNumber2 = Math.floor(Math.random() * 900) + 100;

    const flightId = `${randomLetter1}${randomNumber} ${randomNumber2}`;

    setFlightFormData((prev) => ({
      ...prev,
      flight_id: flightId,
    }));
  };

  // Filter and sort flights
  const filteredAndSortedFlights = flights
    .filter((flight) => {
      // Apply search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          flight.flight_id.toLowerCase().includes(searchLower) ||
          flight.airline.toLowerCase().includes(searchLower) ||
          flight.departure_city.toLowerCase().includes(searchLower) ||
          flight.arrival_city.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .filter((flight) => {
      // Apply airline filter
      if (filterAirline && filterAirline !== "All") {
        return flight.airline === filterAirline;
      }
      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortField === "price") {
        // Sort by price numerically
        const priceA = Number.parseFloat(a.price);
        const priceB = Number.parseFloat(b.price);
        return flightSortOrder === "asc" ? priceA - priceB : priceB - priceA;
      } else if (
        sortField === "departure_date" ||
        sortField === "arrival_date"
      ) {
        // Sort by date
        const dateA = new Date(a[sortField]);
        const dateB = new Date(b[sortField]);
        return flightSortOrder === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      } else {
        // Sort by string fields
        const valueA = String(a[sortField]).toLowerCase();
        const valueB = String(b[sortField]).toLowerCase();
        return flightSortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
    });

  // Paginate flights
  const paginatedFlights = filteredAndSortedFlights.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle delete flight (placeholder function)
  const handleDeleteFlight = (id: number) => {
    // In a real application, you would call an API to delete the flight
    console.log(`Delete flight with ID: ${id}`);
    alert(
      `Delete flight functionality would be implemented here for flight ID: ${id}`
    );
  };

  // Handle edit flight (placeholder function)
  const handleEditFlight = (id: number) => {
    // In a real application, you would navigate to an edit form or open a modal
    console.log(`Edit flight with ID: ${id}`);
    alert(
      `Edit flight functionality would be implemented here for flight ID: ${id}`
    );
  };

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

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

        {/* Stats Overview */}
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

        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            {/* Search and Tabs */}
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
                    className="w-full sm:w-64 pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              )}
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === "flights" ? (
            <div className="p-6">
              {/* Flights Tab Content */}
              {/* Filters and Search */}
              <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search flights..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-64"
                    />
                    <Filter className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                  <select
                    value={filterAirline}
                    onChange={(e) => setFilterAirline(e.target.value)}
                    className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">All Airlines</option>
                    {airlines.map((airline) => (
                      <option key={airline} value={airline}>
                        {airline}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                    <option value={50}>50 per page</option>
                    <option value={100}>100 per page</option>
                  </select>
                  <button
                    onClick={fetchFlights}
                    className="flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Refresh
                  </button>
                </div>
              </div>

              {/* Loading and Error States */}
              {loadingFlights && (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                  <span className="ml-2">Loading flights...</span>
                </div>
              )}

              {flightsError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                  <p>{flightsError}</p>
                </div>
              )}

              {/* Flights Table */}
              {!loadingFlights && !flightsError && (
                <>
                  <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort("flight_id")}
                          >
                            <div className="flex items-center">
                              Flight ID
                              {sortField === "flight_id" &&
                                (flightSortOrder === "asc" ? (
                                  <ChevronUp className="h-4 w-4 ml-1" />
                                ) : (
                                  <ChevronDown className="h-4 w-4 ml-1" />
                                ))}
                            </div>
                          </th>
                          <th
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort("airline")}
                          >
                            <div className="flex items-center">
                              Airline
                              {sortField === "airline" &&
                                (flightSortOrder === "asc" ? (
                                  <ChevronUp className="h-4 w-4 ml-1" />
                                ) : (
                                  <ChevronDown className="h-4 w-4 ml-1" />
                                ))}
                            </div>
                          </th>
                          <th
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort("departure_date")}
                          >
                            <div className="flex items-center">
                              Departure
                              {sortField === "departure_date" &&
                                (flightSortOrder === "asc" ? (
                                  <ChevronUp className="h-4 w-4 ml-1" />
                                ) : (
                                  <ChevronDown className="h-4 w-4 ml-1" />
                                ))}
                            </div>
                          </th>
                          <th
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort("arrival_date")}
                          >
                            <div className="flex items-center">
                              Arrival
                              {sortField === "arrival_date" &&
                                (flightSortOrder === "asc" ? (
                                  <ChevronUp className="h-4 w-4 ml-1" />
                                ) : (
                                  <ChevronDown className="h-4 w-4 ml-1" />
                                ))}
                            </div>
                          </th>
                          <th
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort("price")}
                          >
                            <div className="flex items-center">
                              Price
                              {sortField === "price" &&
                                (flightSortOrder === "asc" ? (
                                  <ChevronUp className="h-4 w-4 ml-1" />
                                ) : (
                                  <ChevronDown className="h-4 w-4 ml-1" />
                                ))}
                            </div>
                          </th>
                          <th
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort("available_seats")}
                          >
                            <div className="flex items-center">
                              Seats
                              {sortField === "available_seats" &&
                                (flightSortOrder === "asc" ? (
                                  <ChevronUp className="h-4 w-4 ml-1" />
                                ) : (
                                  <ChevronDown className="h-4 w-4 ml-1" />
                                ))}
                            </div>
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedFlights.length > 0 ? (
                          paginatedFlights.map((flight) => (
                            <tr
                              key={flight.id}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {flight.flight_id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {flight.airline}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                <div className="flex flex-col">
                                  <span className="font-medium">
                                    {flight.departure_city} (
                                    {flight.departure_code})
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {formatDate(flight.departure_date)}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {formatTime(flight.departure_time)}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                <div className="flex flex-col">
                                  <span className="font-medium">
                                    {flight.arrival_city} ({flight.arrival_code}
                                    )
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {formatDate(flight.arrival_date)}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {formatTime(flight.arrival_time)}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                <span className="font-medium">
                                  NPR{" "}
                                  {Number.parseFloat(
                                    flight.price
                                  ).toLocaleString()}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                <span
                                  className={`${
                                    flight.available_seats < 10
                                      ? "text-red-600 font-medium"
                                      : ""
                                  }`}
                                >
                                  {flight.available_seats}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => handleEditFlight(flight.id)}
                                    className="text-indigo-600 hover:text-indigo-900 transition-colors"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeleteFlight(flight.id)
                                    }
                                    className="text-red-600 hover:text-red-900 transition-colors"
                                  >
                                    <Trash className="h-4 w-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={7}
                              className="px-6 py-4 text-center text-sm text-gray-500"
                            >
                              No flights found matching your criteria.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      Showing{" "}
                      <span className="font-medium">
                        {(currentPage - 1) * itemsPerPage + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium">
                        {Math.min(
                          currentPage * itemsPerPage,
                          filteredAndSortedFlights.length
                        )}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium">
                        {filteredAndSortedFlights.length}
                      </span>{" "}
                      flights
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          setCurrentPage(Math.max(1, currentPage - 1))
                        }
                        disabled={currentPage === 1}
                        className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm font-medium                        text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      {pageNumbers.map((number) => (
                        <button
                          key={number}
                          onClick={() => setCurrentPage(number)}
                          className={`px-3 py-1 border rounded-md text-sm font-medium ${
                            currentPage === number
                              ? "bg-indigo-600 text-white border-indigo-600"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {number}
                        </button>
                      ))}
                      <button
                        onClick={() =>
                          setCurrentPage(Math.min(totalPages, currentPage + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : activeTab === "add-flight" ? (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Add New Flight
              </h2>

              {submitMessage.text && (
                <div
                  className={`mb-4 p-3 rounded-lg ${
                    submitMessage.type === "success"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {submitMessage.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Flight ID and Airline */}
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="flight_id"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Flight ID
                      </label>
                      <div className="flex">
                        <input
                          type="text"
                          id="flight_id"
                          name="flight_id"
                          value={flightFormData.flight_id}
                          onChange={handleInputChange}
                          required
                          className="flex-1 bg-gray-50 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="e.g. A12 345"
                        />
                        <button
                          type="button"
                          onClick={generateFlightId}
                          className="bg-indigo-600 text-white px-3 py-2 rounded-r-lg hover:bg-indigo-700 transition-colors"
                        >
                          Generate
                        </button>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="airline"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Airline
                      </label>
                      <select
                        id="airline"
                        name="airline"
                        value={flightFormData.airline}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        {airlines.map((airline) => (
                          <option key={airline} value={airline}>
                            {airline}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Price (NPR)
                      </label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={flightFormData.price}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="e.g. 5000"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="available_seats"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Available Seats
                      </label>
                      <input
                        type="number"
                        id="available_seats"
                        name="available_seats"
                        value={flightFormData.available_seats}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="e.g. 50"
                      />
                    </div>
                  </div>

                  {/* Departure and Arrival */}
                  <div className="space-y-6">
                    {/* Departure Details */}
                    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <h3 className="text-md font-medium text-gray-800 mb-3">
                        Departure Details
                      </h3>

                      <div className="space-y-3">
                        <div>
                          <label
                            htmlFor="departure_airport"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Airport
                          </label>
                          <select
                            id="departure_airport"
                            name="departure.airport"
                            value={flightFormData.departure.code}
                            onChange={(e) =>
                              handleAirportChange("departure", e.target.value)
                            }
                            required
                            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            {airports.map((airport) => (
                              <option
                                key={`dep-${airport.code}`}
                                value={airport.code}
                              >
                                {airport.name} ({airport.code})
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label
                              htmlFor="departure_date"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Date
                            </label>
                            <input
                              type="date"
                              id="departure_date"
                              name="departure.date"
                              value={flightFormData.departure.date}
                              onChange={handleInputChange}
                              required
                              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="departure_time"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Time
                            </label>
                            <input
                              type="time"
                              id="departure_time"
                              name="departure.time"
                              value={flightFormData.departure.time}
                              onChange={handleInputChange}
                              required
                              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Arrival Details */}
                    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <h3 className="text-md font-medium text-gray-800 mb-3">
                        Arrival Details
                      </h3>

                      <div className="space-y-3">
                        <div>
                          <label
                            htmlFor="arrival_airport"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Airport
                          </label>
                          <select
                            id="arrival_airport"
                            name="arrival.airport"
                            value={flightFormData.arrival.code}
                            onChange={(e) =>
                              handleAirportChange("arrival", e.target.value)
                            }
                            required
                            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            <option value="">Select Airport</option>
                            {airports.map((airport) => (
                              <option
                                key={`arr-${airport.code}`}
                                value={airport.code}
                              >
                                {airport.name} ({airport.code})
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label
                              htmlFor="arrival_date"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Date
                            </label>
                            <input
                              type="date"
                              id="arrival_date"
                              name="arrival.date"
                              value={flightFormData.arrival.date}
                              onChange={handleInputChange}
                              required
                              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="arrival_time"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Time
                            </label>
                            <input
                              type="time"
                              id="arrival_time"
                              name="arrival.time"
                              value={flightFormData.arrival.time}
                              onChange={handleInputChange}
                              required
                              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setFlightFormData(initialFlightFormData)}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? "Adding Flight..." : "Add Flight"}
                  </button>
                </div>
              </form>
            </div>
          ) : activeTab === "bookings" ? (
            <div className="p-6">
              <Bookings />
            </div>
          ) : (
            /* Placeholder for other tabs */
            <div className="p-6 text-center text-gray-500">
              {activeTab === "schedule" ? (
                <p>Schedule management content will be displayed here.</p>
              ) : (
                <p>Content will be displayed here.</p>
              )}
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-800">
                Quick Actions
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab("add-flight")}
                  className="flex items-center justify-center p-4 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  <Plane className="h-5 w-5 mr-2" />
                  Add New Flight
                </button>
                <button className="flex items-center justify-center p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                  <Users className="h-5 w-5 mr-2" />
                  Manage Bookings
                </button>
                <button className="flex items-center justify-center p-4 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors">
                  <Calendar className="h-5 w-5 mr-2" />
                  Update Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
