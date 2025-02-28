import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Plane,
  Calendar,
  Search,
  Clock,
  Users,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { searchFlights } from "../services/api";
import { Flight } from "../types";
import { format } from "date-fns";
import { BookingModal } from "../components/BookingModal";

const cities = [
  "Kathmandu",
  "Pokhara",
  "Lukla",
  "Bharatpur",
  "Biratnagar",
  "Janakpur",
  "Simara",
  "Nepalgunj",
];

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
  const [showSuggestions, setShowSuggestions] = useState({
    departure: false,
    arrival: false,
  });
  const [filteredCities, setFilteredCities] = useState({
    departure: cities,
    arrival: cities,
  });

  useEffect(() => {
    // Auto search if both cities are provided via URL params
    if (searchParams.get("departure") && searchParams.get("destination")) {
      handleSearch(new Event("submit") as any);
    }
  }, []);

  useEffect(() => {
    // Filter cities based on input
    setFilteredCities({
      departure: cities.filter((city) =>
        city.toLowerCase().includes(searchData.departure_city.toLowerCase())
      ),
      arrival: cities.filter((city) =>
        city.toLowerCase().includes(searchData.arrival_city.toLowerCase())
      ),
    });
  }, [searchData.departure_city, searchData.arrival_city]);

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
      } else {
        toast.success(`Found ${results.length} flights`);
      }
    } catch (error) {
      toast.error("Failed to search flights. Please try again.");
      console.error("Error searching flights:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCitySelect = (type: "departure" | "arrival", city: string) => {
    setSearchData({
      ...searchData,
      [type === "departure" ? "departure_city" : "arrival_city"]: city,
    });
    setShowSuggestions({
      ...showSuggestions,
      [type]: false,
    });
  };

  return (
    <div className="min-h-screen bg-honeydew py-12">
      <Toaster position="top-right" />
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-dark_purple mb-4">
            Find Your Perfect Flight
          </h1>
          <p className="text-ash_gray max-w-2xl mx-auto">
            Discover the best flights to your favorite destinations in Nepal
            with our comprehensive search tool.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-12 transform transition-all duration-300 hover:shadow-2xl">
          <div className="bg-dark_purple p-6 text-honeydew">
            <h2 className="text-xl font-semibold flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Search Flights
            </h2>
          </div>

          <form onSubmit={handleSearch} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-rich_black">
                  From
                </label>
                <div className="relative">
                  <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark_purple h-5 w-5" />
                  <input
                    type="text"
                    value={searchData.departure_city}
                    onChange={(e) => {
                      setSearchData({
                        ...searchData,
                        departure_city: e.target.value,
                      });
                      setShowSuggestions({
                        ...showSuggestions,
                        departure: true,
                      });
                    }}
                    onFocus={() =>
                      setShowSuggestions({
                        ...showSuggestions,
                        departure: true,
                      })
                    }
                    className="pl-10 w-full py-3 border-gray-300 border rounded-md focus:ring-2 focus:ring-dark_purple focus:border-dark_purple"
                    placeholder="Departure City"
                    required
                  />
                  {showSuggestions.departure &&
                    filteredCities.departure.length > 0 && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {filteredCities.departure.map((city) => (
                          <div
                            key={city}
                            className="px-4 py-2 hover:bg-honeydew/50 cursor-pointer transition-colors"
                            onClick={() => handleCitySelect("departure", city)}
                          >
                            {city}
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-rich_black">
                  To
                </label>
                <div className="relative">
                  <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark_purple h-5 w-5" />
                  <input
                    type="text"
                    value={searchData.arrival_city}
                    onChange={(e) => {
                      setSearchData({
                        ...searchData,
                        arrival_city: e.target.value,
                      });
                      setShowSuggestions({ ...showSuggestions, arrival: true });
                    }}
                    onFocus={() =>
                      setShowSuggestions({ ...showSuggestions, arrival: true })
                    }
                    className="pl-10 w-full py-3 border-gray-300 border rounded-md focus:ring-2 focus:ring-dark_purple focus:border-dark_purple"
                    placeholder="Arrival City"
                    required
                  />
                  {showSuggestions.arrival &&
                    filteredCities.arrival.length > 0 && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {filteredCities.arrival.map((city) => (
                          <div
                            key={city}
                            className="px-4 py-2 hover:bg-honeydew/50 cursor-pointer transition-colors"
                            onClick={() => handleCitySelect("arrival", city)}
                          >
                            {city}
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-rich_black">
                  Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark_purple h-5 w-5" />
                  <input
                    type="date"
                    value={searchData.date}
                    onChange={(e) =>
                      setSearchData({ ...searchData, date: e.target.value })
                    }
                    className="pl-10 w-full py-3 border-gray-300 border rounded-md focus:ring-2 focus:ring-dark_purple focus:border-dark_purple"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="mt-8 w-full bg-dark_purple text-honeydew py-4 rounded-md hover:bg-dark_purple/90 transition-all duration-300 flex items-center justify-center font-medium transform hover:translate-y-[-2px] hover:shadow-lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5 mr-2" />
                  Search Flights
                </>
              )}
            </button>
          </form>
        </div>

        {/* Flight Results */}
        {flights.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-dark_purple mb-6 relative inline-block">
              Available Flights
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-naples_yellow"></span>
            </h2>

            <div className="space-y-6">
              {flights.map((flight) => (
                <div
                  key={flight.flight_id}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl group"
                >
                  <div className="md:flex">
                    {/* Flight info section */}
                    <div className="p-6 md:p-8 flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:space-x-12">
                        {/* Departure */}
                        <div className="mb-4 md:mb-0">
                          <p className="text-sm text-ash_gray mb-1">
                            Departure
                          </p>
                          <p className="text-2xl font-bold text-dark_purple">
                            {flight.departure_city}
                          </p>
                          <div className="flex items-center mt-1 text-ash_gray">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{flight.departure_time}</span>
                          </div>
                        </div>

                        {/* Flight path visualization */}
                        <div className="hidden md:flex items-center flex-1 justify-center relative py-4">
                          <div className="w-full h-[2px] bg-gray-200"></div>
                          <Plane className="absolute text-dark_purple h-6 w-6 transform rotate-90 group-hover:translate-x-2 transition-transform duration-500" />
                        </div>

                        {/* Arrival */}
                        <div>
                          <p className="text-sm text-ash_gray mb-1">Arrival</p>
                          <p className="text-2xl font-bold text-dark_purple">
                            {flight.arrival_city}
                          </p>
                          <div className="flex items-center mt-1 text-ash_gray">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{flight.arrival_time}</span>
                          </div>
                        </div>
                      </div>

                      {/* Flight details */}
                      <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap gap-6">
                        <div>
                          <p className="text-sm text-ash_gray mb-1">
                            Flight Date
                          </p>
                          <p className="font-medium">{searchData.date}</p>
                        </div>
                        <div>
                          <p className="text-sm text-ash_gray mb-1">
                            Flight Number
                          </p>
                          <p className="font-medium">AH-{flight.flight_id}</p>
                        </div>
                        <div>
                          <p className="text-sm text-ash_gray mb-1">
                            Available Seats
                          </p>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1 text-dark_purple" />
                            <span className="font-medium">
                              {flight.available_seats}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Price and booking section */}
                    <div className="bg-honeydew/30 p-6 md:p-8 md:w-64 flex flex-col justify-between">
                      <div>
                        <p className="text-sm text-ash_gray mb-1">
                          Price per person
                        </p>
                        <p className="text-3xl font-bold text-dark_purple">
                          NPR {flight.price}
                        </p>
                        <div className="mt-2 text-xs text-ash_gray">
                          *Includes taxes and fees
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedFlight(flight)}
                        className="mt-6 bg-naples_yellow text-rich_black px-6 py-3 rounded-md hover:bg-naples_yellow/90 transition-all duration-300 font-medium flex items-center justify-center group-hover:shadow-md"
                      >
                        Book Now
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {flights.length === 0 &&
          !loading &&
          searchData.departure_city &&
          searchData.arrival_city && (
            <div className="text-center py-12">
              <div className="text-dark_purple/30 mb-4">
                <Plane className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-medium text-dark_purple mb-2">
                No flights found
              </h3>
              <p className="text-ash_gray">
                We couldn't find any flights matching your search criteria.
                Please try different dates or destinations.
              </p>
            </div>
          )}

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
