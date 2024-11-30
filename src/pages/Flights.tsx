import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Plane, Calendar, Search } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { searchFlights } from "../services/api";
import { Flight } from "../types";
import { format } from "date-fns";
import { BookingModal } from "../components/BookingModal";

export const Flights: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchData, setSearchData] = useState({
    departure_city: searchParams.get("departure") || "",
    arrival_city: searchParams.get("destination") || "",
    date: format(new Date(), "yyyy-MM-dd"),
  });
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const results = await searchFlights(
        searchData.departure_city,
        searchData.arrival_city
      );
      setFlights(results);

      if (results.length === 0) {
        toast.error("No flights found for the selected criteria");
      }
    } catch (error) {
      toast.error("Failed to search flights. Please try again.");
      console.error("Error searching flights:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-honeydew py-8">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-dark_purple mb-8">
          Search Flights
        </h1>

        <form
          onSubmit={handleSearch}
          className="bg-white p-6 rounded-lg shadow-md mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From
              </label>
              <div className="relative">
                <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchData.departure_city}
                  onChange={(e) =>
                    setSearchData({
                      ...searchData,
                      departure_city: e.target.value,
                    })
                  }
                  className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-dark_purple focus:border-transparent"
                  placeholder="Departure City"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To
              </label>
              <div className="relative">
                <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchData.arrival_city}
                  onChange={(e) =>
                    setSearchData({
                      ...searchData,
                      arrival_city: e.target.value,
                    })
                  }
                  className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-dark_purple focus:border-transparent"
                  placeholder="Arrival City"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="date"
                  value={searchData.date}
                  onChange={(e) =>
                    setSearchData({ ...searchData, date: e.target.value })
                  }
                  className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-dark_purple focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-dark_purple text-honeydew py-3 rounded-md hover:bg-dark_purple-900 transition-colors flex items-center justify-center"
            disabled={loading}
          >
            <Search className="h-5 w-5 mr-2" />
            {loading ? "Searching..." : "Search Flights"}
          </button>
        </form>

        {/* Flight Results */}
        <div className="space-y-4">
          {flights.map((flight) => (
            <div
              key={flight.flight_id}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-lg font-semibold">
                      {flight.departure_city}
                    </p>
                    <p className="text-sm text-gray-500">
                      {flight.departure_time}
                    </p>
                  </div>
                  <Plane className="h-6 w-6 text-dark_purple" />
                  <div>
                    <p className="text-lg font-semibold">
                      {flight.arrival_city}
                    </p>
                    <p className="text-sm text-gray-500">
                      {flight.arrival_time}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 md:mt-0 text-center md:text-right">
                <p className="text-2xl font-bold text-dark_purple">
                  NPR {flight.price}
                </p>
                <p className="text-sm text-gray-500">
                  {flight.available_seats} seats available
                </p>
                <button
                  onClick={() => setSelectedFlight(flight)}
                  className="mt-2 bg-naples_yellow text-rich_black px-6 py-2 rounded-md hover:bg-naples_yellow/90"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedFlight && (
          <BookingModal
            flight={selectedFlight}
            onClose={() => setSelectedFlight(null)}
          />
        )}
      </div>
    </div>
  );
};
