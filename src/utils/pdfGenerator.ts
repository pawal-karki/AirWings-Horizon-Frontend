import { jsPDF } from 'jspdf';
import { Flight } from '../types';
import { format } from 'date-fns';

interface TicketData {
  flight: Flight;
  passengerName: string;
  passengerEmail: string;
  bookingId: string;
  bookingDate: Date;
}

export const generateTicketPDF = (data: TicketData): string => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Header
  doc.setFontSize(20);
  doc.text('Airwings Horizon', pageWidth / 2, 20, { align: 'center' });
  
  doc.setFontSize(16);
  doc.text('Flight Ticket', pageWidth / 2, 30, { align: 'center' });
  
  // Booking Information
  doc.setFontSize(12);
  doc.text(`Booking ID: ${data.bookingId}`, 20, 50);
  doc.text(`Booking Date: ${format(data.bookingDate, 'MMM dd, yyyy HH:mm')}`, 20, 60);
  
  // Passenger Information
  doc.text('Passenger Information:', 20, 80);
  doc.text(`Name: ${data.passengerName}`, 30, 90);
  doc.text(`Email: ${data.passengerEmail}`, 30, 100);
  
  // Flight Information
  doc.text('Flight Details:', 20, 120);
  doc.text(`Flight Number: ${data.flight.flight_id}`, 30, 130);
  doc.text(`From: ${data.flight.departure_city}`, 30, 140);
  doc.text(`To: ${data.flight.arrival_city}`, 30, 150);
  doc.text(`Departure: ${data.flight.departure_time}`, 30, 160);
  doc.text(`Arrival: ${data.flight.arrival_time}`, 30, 170);
  
  // Terms and Conditions
  doc.setFontSize(10);
  doc.text('Terms and Conditions:', 20, 200);
  doc.text('- Please arrive at the airport at least 2 hours before departure', 25, 210);
  doc.text('- Valid ID is required for check-in', 25, 220);
  doc.text('- Baggage allowance: 20kg', 25, 230);
  
  // Footer
  doc.setFontSize(8);
  doc.text('This is a computer-generated document. No signature is required.', pageWidth / 2, 280, { align: 'center' });
  
  // Return the PDF as base64 string
  return doc.output('datauristring');
};