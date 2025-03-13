"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Filter, RefreshCw } from "lucide-react";
import { FlightTable } from "./flight-table";
import { FlightPagination } from "./FlightPagination";

// List of airlines for the dropdown
const airlines = [
  "Nepal Airlines",
  "Buddha Air",
  "Yeti Airlines",
  "Saurya Airlines",
];

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

export const FlightsTab: React.FC = () => {
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
    fetchFlights();
  }, []);

  // Update total pages when items per page changes
  useEffect(() => {
    if (flights.length > 0) {
      setTotalPages(Math.ceil(flights.length / itemsPerPage));
    }
  }, [flights.length, itemsPerPage]);

  // Handle sort for flights table
  const handleSort = (field: keyof Flight) => {
    if (sortField === field) {
      setFlightSortOrder(flightSortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setFlightSortOrder("asc");
    }
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

  return (
    <div className="p-6">
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
          <FlightTable
            flights={paginatedFlights}
            sortField={sortField}
            flightSortOrder={flightSortOrder}
            handleSort={handleSort}
          />

          {/* Pagination */}
          <FlightPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={filteredAndSortedFlights.length}
          />
        </>
      )}
    </div>
  );
};
