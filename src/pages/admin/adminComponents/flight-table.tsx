"use client";

import type React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

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

interface FlightTableProps {
  flights: Flight[];
  sortField: keyof Flight;
  flightSortOrder: "asc" | "desc";
  handleSort: (field: keyof Flight) => void;
}

export const FlightTable: React.FC<FlightTableProps> = ({
  flights,
  sortField,
  flightSortOrder,
  handleSort,
}) => {
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

  return (
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
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {flights.length > 0 ? (
            flights.map((flight) => (
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
                      {flight.departure_city} ({flight.departure_code})
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
                      {flight.arrival_city} ({flight.arrival_code})
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
                    NPR {Number.parseFloat(flight.price).toLocaleString()}
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
  );
};
