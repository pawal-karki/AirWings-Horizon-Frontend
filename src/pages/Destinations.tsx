import React from 'react';
import { MapPin } from 'lucide-react';

const destinations = [
  {
    id: '1',
    name: 'Pokhara',
    imageUrl: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b',
    description: 'Gateway to the Annapurna Range with stunning lake views',
    highlights: ['Phewa Lake', 'World Peace Pagoda', 'Sarangkot Viewpoint'],
  },
  {
    id: '2',
    name: 'Lukla',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
    description: 'Starting point for Everest Base Camp treks',
    highlights: ['Tenzing-Hillary Airport', 'Mountain Views', 'Trekking Routes'],
  },
  {
    id: '3',
    name: 'Bharatpur',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
    description: 'Gateway to Chitwan National Park',
    highlights: ['Wildlife Safari', 'Bird Watching', 'Cultural Tours'],
  },
  {
    id: '4',
    name: 'Jomsom',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
    description: 'Desert-like valley in the Himalayas',
    highlights: ['Mustang Region', 'Apple Orchards', 'Buddhist Monasteries'],
  },
  {
    id: '5',
    name: 'Simara',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
    description: 'Industrial hub with scenic surroundings',
    highlights: ['Business District', 'Local Markets', 'Transit Point'],
  },
  {
    id: '6',
    name: 'Biratnagar',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
    description: 'Major city in eastern Nepal',
    highlights: ['Cultural Heritage', 'Shopping Districts', 'Local Cuisine'],
  },
  {
    id: '7',
    name: 'Nepalgunj',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
    description: 'Gateway to western Nepal',
    highlights: ['Bageshwori Temple', 'Local Bazaars', 'Border Town'],
  },
  {
    id: '8',
    name: 'Tumlingtar',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
    description: 'Access point to Makalu region',
    highlights: ['Mountain Views', 'Trekking Routes', 'Local Culture'],
  },
  {
    id: '9',
    name: 'Janakpur',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
    description: 'Religious and cultural center',
    highlights: ['Janaki Temple', 'Religious Sites', 'Cultural Heritage'],
  },
  {
    id: '10',
    name: 'Surkhet',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
    description: 'Provincial capital with natural beauty',
    highlights: ['Bulbule Lake', 'Kakre Bihar', 'Deuti Bajai Temple'],
  },
];

export const Destinations: React.FC = () => {
  return (
    <div className="min-h-screen bg-honeydew py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-dark_purple mb-8">Popular Destinations</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <div key={destination.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={destination.imageUrl}
                alt={destination.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-dark_purple mb-2">{destination.name}</h2>
                <p className="text-ash_gray mb-4">{destination.description}</p>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-dark_purple">Highlights:</h3>
                  <ul className="space-y-1">
                    {destination.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center text-ash_gray">
                        <MapPin className="h-4 w-4 mr-2 text-dark_purple" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button
                  onClick={() => window.location.href = `/flights?destination=${destination.name}`}
                  className="mt-6 w-full bg-naples_yellow text-rich_black py-2 rounded-md hover:bg-naples_yellow/90 transition-colors"
                >
                  Book Flight
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};