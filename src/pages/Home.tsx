import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Plane, Star, ChevronRight } from "lucide-react";

const popularDestinations = [
  {
    id: "1",
    name: "Pokhara",
    imageUrl: "https://images.unsplash.com/photo-1605640840605-14ac1855827b",
    description: "Gateway to the Annapurna Range with stunning lake views",
    rating: 4.9,
    flightTime: "25 min",
  },
  {
    id: "2",
    name: "Lukla",
    imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
    description: "Starting point for Everest Base Camp treks",
    rating: 4.7,
    flightTime: "40 min",
  },
  {
    id: "3",
    name: "Bharatpur",
    imageUrl: "https://images.unsplash.com/photo-1605640840605-14ac1855827b",
    description: "Gateway to Chitwan National Park",
    rating: 4.5,
    flightTime: "20 min",
  },
];

const testimonials = [
  {
    id: "1",
    name: "Mallika Ghale",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    text: "The flight to Pokhara was breathtaking. The views of the Annapurna range were incredible!",
    rating: 5,
  },
  {
    id: "2",
    name: "Rohit Sharma",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    text: "Professional service and amazing experience flying to Lukla. Would definitely recommend!",
    rating: 4,
  },
];

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-honeydew">
      {/* Hero Section */}
      <div className="relative h-[650px] bg-dark_purple overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa"
          alt="Nepal Mountains"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark_purple/70 to-dark_purple/10">
          <div className="container mx-auto px-6 h-full flex items-center">
            <div className="max-w-2xl text-honeydew animate-fade-in-up">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-dark_purple/50 text-naples_yellow text-sm font-medium mb-6">
                <Plane className="h-4 w-4 mr-2" /> Premium Flight Experience
              </div>
              <h1 className="text-5xl font-bold mb-6 tracking-tight leading-tight">
                Discover Nepal's Beauty <br />
                from Above
              </h1>
              <p className="text-xl mb-8 text-honeydew/90 leading-relaxed">
                Experience the majestic Himalayas and breathtaking landscapes
                with Airwings Horizon. Unforgettable aerial adventures await.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/flights"
                  className="bg-naples_yellow text-rich_black px-8 py-4 rounded-md inline-flex items-center space-x-2 hover:bg-naples_yellow/90 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg font-medium"
                >
                  <span>Book Your Flight</span>
                  <ArrowRight className="h-5 w-5 ml-2 animate-bounce-right" />
                </Link>
                <Link
                  to="/destinations"
                  className="border-2 border-honeydew/30 text-honeydew px-8 py-4 rounded-md inline-flex items-center space-x-2 hover:bg-honeydew/10 transition-all duration-300"
                >
                  <span>View Destinations</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-naples_yellow rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-40 h-40 bg-dark_purple rounded-full opacity-20 animate-float"></div>
      </div>

      {/* Popular Destinations */}
      <div className="container mx-auto px-6 py-24">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-dark_purple relative inline-block">
              Popular Destinations
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-naples_yellow"></span>
            </h2>
            <p className="text-ash_gray mt-4 max-w-2xl">
              Discover the most sought-after destinations in Nepal, each
              offering unique experiences and breathtaking views.
            </p>
          </div>
          <Link
            to="/destinations"
            className="text-dark_purple hover:text-dark_purple/80 flex items-center group transition-all duration-300 font-medium"
          >
            View All Destinations
            <ChevronRight className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {popularDestinations.map((destination) => (
            <div
              key={destination.id}
              className="rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="relative overflow-hidden">
                <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-dark_purple flex items-center">
                  <Plane className="h-3 w-3 mr-1" /> {destination.flightTime}
                </div>
                <img
                  src={destination.imageUrl}
                  alt={destination.name}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 text-white">
                    <p className="font-bold text-xl">{destination.name}</p>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-naples_yellow fill-naples_yellow" />
                      <span className="ml-1 text-sm">{destination.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-dark_purple">
                    {destination.name}
                  </h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-naples_yellow fill-naples_yellow" />
                    <span className="ml-1 text-sm font-medium">
                      {destination.rating}
                    </span>
                  </div>
                </div>
                <p className="text-ash_gray mb-4">{destination.description}</p>
                <div className="flex justify-between items-center">
                  <Link
                    to={`/flights?destination=${destination.name}`}
                    className="text-dark_purple font-medium hover:text-dark_purple/80 flex items-center group"
                  >
                    Book Flight
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                  <span className="text-sm font-medium text-ash_gray">
                    From RS 5,000
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-honeydew/50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark_purple relative inline-block">
              What Our Customers Say
              <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-naples_yellow"></span>
            </h2>
            <p className="text-ash_gray mt-4 max-w-2xl mx-auto">
              Hear from travelers who have experienced our exceptional service
              and breathtaking flights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-dark_purple">
                      {testimonial.name}
                    </h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating
                              ? "text-naples_yellow fill-naples_yellow"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-ash_gray italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/testimonials"
              className="inline-flex items-center text-dark_purple font-medium hover:text-dark_purple/80 transition-colors duration-300"
            >
              Read More Reviews
              <ChevronRight className="h-5 w-5 ml-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-6 py-24">
        <div className="bg-dark_purple rounded-2xl overflow-hidden shadow-xl relative">
          <div className="absolute inset-0 bg-gradient-to-r from-dark_purple to-dark_purple/80"></div>
          <div className="relative z-10 p-12 md:p-16 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h2 className="text-3xl font-bold text-honeydew mb-4">
                Ready for Your Next Adventure?
              </h2>
              <p className="text-honeydew/80 max-w-xl">
                Book your flight today and experience the beauty of Nepal from a
                whole new perspective.
              </p>
            </div>
            <Link
              to="/flights"
              className="bg-naples_yellow text-rich_black px-8 py-4 rounded-md inline-flex items-center space-x-2 hover:bg-naples_yellow/90 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg font-medium whitespace-nowrap"
            >
              <span>Book Your Flight</span>
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-dark_purple/70 rounded-full opacity-20 transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-naples_yellow rounded-full opacity-10 transform -translate-x-1/3 translate-y-1/3"></div>
        </div>
      </div>
    </div>
  );
};
