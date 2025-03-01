import React, { useEffect, useState } from "react";
import { MapPin, ArrowRight } from "lucide-react";

// Import local images
import pokharaImg from "../assets/images/Pokhara.jpg";
import luklaImg from "../assets/images/Lukla.jpg";
import bharatpurImg from "../assets/images/Bharatpur.jpg";
import jomsomImg from "../assets/images/Jomsom.png";
import simaraImg from "../assets/images/Simara.jpg";
import biratnagarImg from "../assets/images/Biratnagar.jpg";
import nepalgunjImg from "../assets/images/Nepalgunj.jpg";
import tumlingtarImg from "../assets/images/Tumlingtar.jpg";
import janakpurImg from "../assets/images/Janakpur.jpg";

// Define destinations
const destinations = [
  {
    id: "1",
    name: "Pokhara",
    imageUrl: pokharaImg,
    description:
      "A picturesque city at the foothills of the Annapurna Range, known for its tranquil lakes, adventure sports, and breathtaking landscapes.",
    highlights: ["Phewa Lake", "World Peace Pagoda", "Sarangkot Viewpoint"],
  },
  {
    id: "2",
    name: "Lukla",
    imageUrl: luklaImg,
    description:
      "A small mountain town serving as the gateway to Everest Base Camp, famous for its thrilling airport and stunning Himalayan views.",
    highlights: [
      "Tenzing-Hillary Airport",
      "Mountain Views",
      "Trekking Routes",
    ],
  },
  {
    id: "3",
    name: "Bharatpur",
    imageUrl: bharatpurImg,
    description:
      "A growing city and the entry point to Chitwan National Park, home to diverse wildlife, lush forests, and exciting jungle safaris.",
    highlights: ["Wildlife Safari", "Bird Watching", "Cultural Tours"],
  },
  {
    id: "4",
    name: "Jomsom",
    imageUrl: jomsomImg,
    description:
      "A high-altitude town in the Mustang region, offering a unique desert-like landscape, rich Tibetan culture, and breathtaking views.",
    highlights: ["Mustang Region", "Apple Orchards", "Buddhist Monasteries"],
  },
  {
    id: "5",
    name: "Simara",
    imageUrl: simaraImg,
    description:
      "An emerging industrial hub in Nepal, surrounded by greenery and known for its commercial activities and easy connectivity.",
    highlights: ["Business District", "Local Markets", "Transit Point"],
  },
  {
    id: "6",
    name: "Biratnagar",
    imageUrl: biratnagarImg,
    description:
      "One of Nepal’s largest cities, famous for its vibrant trade, rich cultural heritage, and a variety of shopping and dining experiences.",
    highlights: ["Cultural Heritage", "Shopping Districts", "Local Cuisine"],
  },
  {
    id: "7",
    name: "Nepalgunj",
    imageUrl: nepalgunjImg,
    description:
      "A bustling trade center and the gateway to western Nepal, known for its historic temples, local bazaars, and diverse culture.",
    highlights: ["Bageshwori Temple", "Local Bazaars", "Border Town"],
  },
  {
    id: "8",
    name: "Tumlingtar",
    imageUrl: tumlingtarImg,
    description:
      "A peaceful town providing access to the Makalu region, offering stunning trekking routes, cultural experiences, and mountain scenery.",
    highlights: ["Mountain Views", "Trekking Routes", "Local Culture"],
  },
  {
    id: "9",
    name: "Janakpur",
    imageUrl: janakpurImg,
    description:
      "A sacred city and a major Hindu pilgrimage site, known for its magnificent temples, rich traditions, and historical significance.",
    highlights: ["Janaki Temple", "Religious Sites", "Cultural Heritage"],
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
