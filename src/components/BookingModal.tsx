import React, { useState } from "react";
import { X } from "lucide-react";
import { Flight } from "../types";
import { generateTicketPDF } from "../utils/pdfGenerator";
import { toast } from "react-hot-toast";

interface BookingModalProps {
  flight: Flight;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  flight,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    passengerName: "",
    passengerEmail: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Generate booking ID (in production this would come from the backend)
      const bookingId = `BK${Math.random()
        .toString(36)
        .substr(2, 9)
        .toUpperCase()}`;

      // Generate PDF ticket
      const pdfData = generateTicketPDF({
        flight,
        passengerName: formData.passengerName,
        passengerEmail: formData.passengerEmail,
        bookingId,
        bookingDate: new Date(),
      });

      // Create a link element and trigger download
      const link = document.createElement("a");
      link.href = pdfData;
      link.download = `ticket-${bookingId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Booking successful! Your ticket has been downloaded.");
      onClose();
    } catch (error) {
      console.error("Error generating ticket:", error);
      toast.error("Failed to generate ticket. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-dark_purple">Book Flight</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Flight Details</h3>
          <p>From: {flight.departure_city}</p>
          <p>To: {flight.arrival_city}</p>
          <p>Departure: {flight.departure_time}</p>
          <p>Price: NPR {flight.price}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passenger Name
            </label>
            <input
              type="text"
              required
              value={formData.passengerName}
              onChange={(e) =>
                setFormData({ ...formData, passengerName: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-dark_purple focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.passengerEmail}
              onChange={(e) =>
                setFormData({ ...formData, passengerEmail: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-dark_purple focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-dark_purple text-honeydew py-2 rounded-md hover:bg-dark_purple-900 transition-colors"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};