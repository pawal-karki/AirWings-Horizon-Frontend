import { jsPDF } from "jspdf";
import { format, isValid } from "date-fns";
import type { Flight } from "../types"; // Adjust the import path as needed

interface TicketData {
  flight: Flight;
  passengerName: string;
  bookingId?: string;
  bookingDate?: Date;
}

// Helper function to safely parse and format dates
const safeFormatDate = (
  dateString: string,
  formatString = "MMM dd, yyyy HH:mm"
): string => {
  const date = new Date(dateString);
  return isValid(date) ? format(date, formatString) : "Not specified";
};

// Helper function to safely format price
const formatPrice = (price: number | string | undefined): string => {
  if (typeof price === "undefined") {
    return "N/A";
  }
  const numPrice = typeof price === "string" ? Number.parseFloat(price) : price;
  return isNaN(numPrice) ? "N/A" : numPrice.toFixed(2);
};

export const generateTicketPDF = (data: TicketData): string => {
  try {
    // Create a new PDF document
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 20;

    // Header
    doc.setFontSize(22);
    doc.setTextColor(220, 30, 50);
    doc.text("Airwings Horizon", pageWidth / 2, yPos, { align: "center" });

    yPos += 10;
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Flight Ticket", pageWidth / 2, yPos, { align: "center" });

    yPos += 15;
    // Add horizontal line
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(20, yPos, pageWidth - 20, yPos);

    // Booking Information
    yPos += 15;
    doc.setFontSize(12);
    doc.text(`Booking ID: ${data.bookingId || "Not assigned"}`, 20, yPos);

    yPos += 10;
    // Safely format the booking date
    const formattedBookingDate = data.bookingDate
      ? format(data.bookingDate, "MMM dd, yyyy HH:mm")
      : "Not specified";
    doc.text(`Booking Date: ${formattedBookingDate}`, 20, yPos);

    // Passenger Information
    yPos += 20;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Passenger Information", 20, yPos);

    yPos += 10;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${data.passengerName || "Not specified"}`, 30, yPos);

    // Flight Information
    yPos += 20;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Flight Details", 20, yPos);

    yPos += 10;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Flight Number: ${data.flight.flight_id}`, 30, yPos);

    yPos += 10;
    doc.text(`From: ${data.flight.departure_city}`, 30, yPos);

    yPos += 10;
    doc.text(`To: ${data.flight.arrival_city}`, 30, yPos);

    yPos += 10;

    // Add a simple table for fare information
    yPos += 20;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Fare Information", 20, yPos);

    // Create a simple table
    yPos += 10;
    const tableStartY = yPos;
    const colWidth = (pageWidth - 40) / 2;

    // Table headers
    doc.setFillColor(240, 240, 240);
    doc.rect(20, yPos, pageWidth - 40, 10, "F");
    doc.setFontSize(12);
    doc.text("Description", 25, yPos + 7);
    doc.text("Amount", 20 + colWidth + 5, yPos + 7);

    // Table rows
    yPos += 10;
    doc.setFont("helvetica", "normal");
    doc.text("Flight Price", 25, yPos + 7);
    doc.text(
      `RS ${formatPrice(data.flight.price)}`,
      20 + colWidth + 5,
      yPos + 7
    );

    yPos += 10;
    doc.setFont("helvetica", "bold");
    doc.text("Total", 25, yPos + 7);
    doc.text(
      `RS ${formatPrice(data.flight.price)}`,
      20 + colWidth + 5,
      yPos + 7
    );

    // Draw table borders
    doc.setDrawColor(0);
    doc.setLineWidth(0.1);
    doc.rect(20, tableStartY, pageWidth - 40, yPos - tableStartY + 10);
    doc.line(20, tableStartY + 10, pageWidth - 20, tableStartY + 10);
    doc.line(20 + colWidth, tableStartY, 20 + colWidth, yPos + 10);

    // Terms and Conditions
    yPos += 25;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Terms and Conditions", 20, yPos);

    yPos += 10;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(
      "- Please arrive at the airport at least 2 hours before departure",
      25,
      yPos
    );

    yPos += 7;
    doc.text("- Valid ID is required for check-in", 25, yPos);

    yPos += 7;
    doc.text("- Baggage allowance: Check with your airline", 25, yPos);

    // Footer
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(8);
    doc.text(
      "This is a computer-generated document. No signature is required.",
      pageWidth / 2,
      pageHeight - 20,
      {
        align: "center",
      }
    );
    doc.text(
      `© ${new Date().getFullYear()} Airwings Horizon. All rights reserved.`,
      pageWidth / 2,
      pageHeight - 10,
      {
        align: "center",
      }
    );

    // Return the PDF as base64 string
    return doc.output("datauristring");
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate PDF ticket");
  }
};
