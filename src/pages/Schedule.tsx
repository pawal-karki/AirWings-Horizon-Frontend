import React, { useState } from 'react';
import { Calendar, Edit2, Save, X } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { toast, Toaster } from 'react-hot-toast';
import { format } from 'date-fns';

interface ScheduleItem {
  id: string;
  flightNumber: string;
  route: string;
  departureTime: string;
  arrivalTime: string;
  frequency: string;
  status: 'active' | 'cancelled' | 'delayed';
}

const initialSchedule: ScheduleItem[] = [
  {
    id: '1',
    flightNumber: 'AH101',
    route: 'Kathmandu - Pokhara',
    departureTime: '10:00',
    arrivalTime: '10:45',
    frequency: 'Daily',
    status: 'active',
  },
  {
    id: '2',
    flightNumber: 'AH102',
    route: 'Kathmandu - Lukla',
    departureTime: '07:00',
    arrivalTime: '07:35',
    frequency: 'Mon, Wed, Fri',
    status: 'active',
  },
];

export const Schedule: React.FC = () => {
  const { user } = useAuthStore();
  const [schedule, setSchedule] = useState<ScheduleItem[]>(initialSchedule);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<ScheduleItem | null>(null);

  const handleEdit = (item: ScheduleItem) => {
    setEditingId(item.id);
    setEditForm(item);
  };

  const handleSave = (id: string) => {
    if (!editForm) return;

    setSchedule(schedule.map(item => 
      item.id === id ? editForm : item
    ));
    setEditingId(null);
    setEditForm(null);
    toast.success('Schedule updated successfully');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
  };

  return (
    <div className="min-h-screen bg-honeydew py-8">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-dark_purple">Flight Schedule</h1>
            <p className="text-ash_gray">
              Last updated: {format(new Date(), 'MMM dd, yyyy HH:mm')}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Flight
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Route
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Departure
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Arrival
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Frequency
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  {user?.role === 'admin' && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {schedule.map((item) => (
                  <tr key={item.id}>
                    {editingId === item.id ? (
                      <>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={editForm?.flightNumber}
                            onChange={(e) => setEditForm(prev => ({ ...prev!, flightNumber: e.target.value }))}
                            className="w-full p-1 border rounded"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={editForm?.route}
                            onChange={(e) => setEditForm(prev => ({ ...prev!, route: e.target.value }))}
                            className="w-full p-1 border rounded"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="time"
                            value={editForm?.departureTime}
                            onChange={(e) => setEditForm(prev => ({ ...prev!, departureTime: e.target.value }))}
                            className="w-full p-1 border rounded"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="time"
                            value={editForm?.arrivalTime}
                            onChange={(e) => setEditForm(prev => ({ ...prev!, arrivalTime: e.target.value }))}
                            className="w-full p-1 border rounded"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={editForm?.frequency}
                            onChange={(e) => setEditForm(prev => ({ ...prev!, frequency: e.target.value }))}
                            className="w-full p-1 border rounded"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={editForm?.status}
                            onChange={(e) => setEditForm(prev => ({ ...prev!, status: e.target.value as any }))}
                            className="w-full p-1 border rounded"
                          >
                            <option value="active">Active</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="delayed">Delayed</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleSave(item.id)}
                              className="text-green-600 hover:text-green-900"
                            >
                              <Save className="h-5 w-5" />
                            </button>
                            <button
                              onClick={handleCancel}
                              className="text-red-600 hover:text-red-900"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.flightNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.route}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.departureTime}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.arrivalTime}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.frequency}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                            ${item.status === 'active' ? 'bg-green-100 text-green-800' : 
                              item.status === 'delayed' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'}`}>
                            {item.status}
                          </span>
                        </td>
                        {user?.role === 'admin' && (
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <button
                              onClick={() => handleEdit(item)}
                              className="text-dark_purple hover:text-dark_purple-900"
                            >
                              <Edit2 className="h-5 w-5" />
                            </button>
                          </td>
                        )}
                      </>
                    )}
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