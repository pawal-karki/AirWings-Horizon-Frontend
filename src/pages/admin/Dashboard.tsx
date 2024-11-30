import React, { useState } from 'react';
import { Users, Plane, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

interface BookingInfo {
  id: string;
  passengerName: string;
  flightNumber: string;
  date: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

const mockBookings: BookingInfo[] = [
  {
    id: '1',
    passengerName: 'John Doe',
    flightNumber: 'AH101',
    date: '2024-03-20',
    status: 'confirmed',
  },
  {
    id: '2',
    passengerName: 'Jane Smith',
    flightNumber: 'AH102',
    date: '2024-03-21',
    status: 'pending',
  },
];

export const AdminDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'bookings' | 'flights' | 'schedule'>('bookings');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Redirect if not admin
  React.useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="min-h-screen bg-honeydew">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-dark_purple mb-6">Admin Dashboard</h1>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-dark_purple text-honeydew p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-80">Total Bookings</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
                <Users className="h-8 w-8 opacity-80" />
              </div>
            </div>

            <div className="bg-naples_yellow text-rich_black p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-80">Active Flights</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <Plane className="h-8 w-8 opacity-80" />
              </div>
            </div>

            <div className="bg-ash_gray text-rich_black p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-80">Today's Flights</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <Calendar className="h-8 w-8 opacity-80" />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'bookings'
                  ? 'bg-dark_purple text-honeydew'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Bookings
            </button>
            <button
              onClick={() => setActiveTab('flights')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'flights'
                  ? 'bg-dark_purple text-honeydew'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Flights
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'schedule'
                  ? 'bg-dark_purple text-honeydew'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Schedule
            </button>
          </div>

          {/* Bookings Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Passenger Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Flight Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={toggleSortOrder}>
                    <div className="flex items-center">
                      Date
                      {sortOrder === 'asc' ? (
                        <ChevronUp className="h-4 w-4 ml-1" />
                      ) : (
                        <ChevronDown className="h-4 w-4 ml-1" />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      #{booking.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.passengerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.flightNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <button className="text-dark_purple hover:text-dark_purple-900">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};