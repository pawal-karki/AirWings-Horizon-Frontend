"use client";

import type React from "react";
import { useState } from "react";

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

export const AddFlightTab: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });

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
          ...prev[parent as keyof typeof prev],
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

  return (
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
                      <option key={`dep-${airport.code}`} value={airport.code}>
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
                      <option key={`arr-${airport.code}`} value={airport.code}>
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
  );
};
