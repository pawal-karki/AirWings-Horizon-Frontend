import React, { useEffect, useState } from "react";
import { MapPin, ArrowRight } from "lucide-react";

// Define destinations with direct image URLs
const destinations = [
  {
    id: "1",
    name: "Pokhara",
    imageUrl:
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=800&q=80",
    description: "Gateway to the Annapurna Range with stunning lake views",
    highlights: ["Phewa Lake", "World Peace Pagoda", "Sarangkot Viewpoint"],
  },
  {
    id: "2",
    name: "Lukla",
    imageUrl:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    description: "Starting point for Everest Base Camp treks",
    highlights: [
      "Tenzing-Hillary Airport",
      "Mountain Views",
      "Trekking Routes",
    ],
  },
  {
    id: "3",
    name: "Bharatpur",
    imageUrl:
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=800&q=80",
    description: "Gateway to Chitwan National Park",
    highlights: ["Wildlife Safari", "Bird Watching", "Cultural Tours"],
  },
  {
    id: "4",
    name: "Jomsom",
    imageUrl:
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=80",
    description: "Desert-like valley in the Himalayas",
    highlights: ["Mustang Region", "Apple Orchards", "Buddhist Monasteries"],
  },
  {
    id: "5",
    name: "Simara",
    imageUrl:
      "https://images.unsplash.com/photo-1583395145517-1e3177037600?auto=format&fit=crop&w=800&q=80",
    description: "Industrial hub with scenic surroundings",
    highlights: ["Business District", "Local Markets", "Transit Point"],
  },
  {
    id: "6",
    name: "Biratnagar",
    imageUrl:
      "https://images.unsplash.com/photo-1583395145517-1e3177037600?auto=format&fit=crop&w=800&q=80",
    description: "Major city in eastern Nepal",
    highlights: ["Cultural Heritage", "Shopping Districts", "Local Cuisine"],
  },
  {
    id: "7",
    name: "Nepalgunj",
    imageUrl:
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=80",
    description: "Gateway to western Nepal",
    highlights: ["Bageshwori Temple", "Local Bazaars", "Border Town"],
  },
  {
    id: "8",
    name: "Tumlingtar",
    imageUrl:
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=800&q=80",
    description: "Access point to Makalu region",
    highlights: ["Mountain Views", "Trekking Routes", "Local Culture"],
  },
  {
    id: "9",
    name: "Janakpur",
    imageUrl:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    description: "Religious and cultural center",
    highlights: ["Janaki Temple", "Religious Sites", "Cultural Heritage"],
  },
  {
    id: "10",
    name: "Surkhet",
    imageUrl:
      "https://images.unsplash.com/photo-1583395145517-1e3177037600?auto=format&fit=crop&w=800&q=80",
    description: "Provincial capital with natural beauty",
    highlights: ["Bulbule Lake", "Kakre Bihar", "Deuti Bajai Temple"],
  },
];

export const Destinations: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<number>(0);

  useEffect(() => {
    // Stagger the animation of cards
    const timer = setInterval(() => {
      setVisibleItems((prev) => {
        if (prev < destinations.length) {
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-honeydew py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-dark_purple mb-2 animate-fade-in">
          Popular Destinations
        </h1>
        <p
          className="text-ash_gray mb-8 text-lg animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          Discover Nepal's most breathtaking locations for your next adventure
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <div
              key={destination.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden hover-scale transition-all duration-300 ${
                index < visibleItems
                  ? "animate-slide-up opacity-100"
                  : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={destination.imageUrl}
                  alt={destination.name}
                  className="w-full h-48 object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-dark_purple mb-2">
                  {destination.name}
                </h2>
                <p className="text-ash_gray mb-4">{destination.description}</p>

                <div className="space-y-2">
                  <h3 className="font-semibold text-dark_purple">
                    Highlights:
                  </h3>
                  <ul className="space-y-1">
                    {destination.highlights.map((highlight, index) => (
                      <li
                        key={index}
                        className="flex items-center text-ash_gray group"
                      >
                        <MapPin className="h-4 w-4 mr-2 text-dark_purple group-hover:animate-bounce-subtle" />
                        <span className="group-hover:text-dark_purple transition-colors duration-300">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() =>
                    (window.location.href = `/flights?destination=${destination.name}`)
                  }
                  className="mt-6 w-full bg-naples_yellow text-rich_black py-2 rounded-md hover:bg-naples_yellow/90 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center"
                >
                  <span>Book Flight</span>
                  <ArrowRight className="ml-2 h-4 w-4 animate-bounce-right" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white p-8 rounded-lg shadow-md animate-float">
          <h2 className="text-3xl font-bold text-dark_purple mb-4">
            Ready for your Nepalese adventure?
          </h2>
          <p className="text-ash_gray mb-6">
            Explore these stunning destinations and create memories that will
            last a lifetime. Our expert guides and comfortable accommodations
            ensure a perfect journey.
          </p>
          <button className="bg-dark_purple text-white py-3 px-6 rounded-md hover:bg-dark_purple/90 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
            View All Destinations
          </button>
        </div>
      </div>
    </div>
  );
};
