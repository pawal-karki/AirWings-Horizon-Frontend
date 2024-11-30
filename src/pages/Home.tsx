import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const popularDestinations = [
  {
    id: "1",
    name: "Pokhara",
    imageUrl: "https://images.unsplash.com/photo-1605640840605-14ac1855827b",
    description: "Gateway to the Annapurna Range with stunning lake views",
  },
  {
    id: "2",
    name: "Lukla",
    imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
    description: "Starting point for Everest Base Camp treks",
  },
  {
    id: "3",
    name: "Bharatpur",
    imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
    description: "Gateway to Chitwan National Park",
  },
];

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-honeydew">
      {/* Hero Section */}
      <div className="relative h-[600px] bg-dark_purple">
        <div className="absolute inset-0 bg-gradient-to-r from-dark_purple to-transparent">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl text-honeydew">
              <h1 className="text-5xl font-bold mb-4">
                Discover Nepal's Beauty from Above
              </h1>
              <p className="text-xl mb-8">
                Experience the majestic Himalayas and breathtaking landscapes
                with Airwings Horizon
              </p>
              <Link
                to="/flights"
                className="bg-naples_yellow text-rich_black px-8 py-3 rounded-md inline-flex items-center space-x-2 hover:bg-naples_yellow/90"
              >
                <span>Book Now</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-dark_purple">
            Popular Destinations
          </h2>
          <Link
            to="/destinations"
            className="text-dark_purple hover:text-dark_purple-900 flex items-center"
          >
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {popularDestinations.map((destination) => (
            <div
              key={destination.id}
              className="rounded-lg overflow-hidden shadow-lg bg-white"
            >
              <img
                src={destination.imageUrl}
                alt={destination.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
                <p className="text-ash_gray mb-4">{destination.description}</p>
                <Link
                  to={`/flights?destination=${destination.name}`}
                  className="text-dark_purple hover:text-dark_purple-900 flex items-center"
                >
                  Book Flight <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
