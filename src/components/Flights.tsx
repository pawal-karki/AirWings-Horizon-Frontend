// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   ArrowRight,
//   Filter,
//   RefreshCw,
//   Trash,
//   Edit,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";

// interface Flight {
//   id: number;
//   flight_id: string;
//   airline: string;
//   departure_airport: string;
//   departure_code: string;
//   departure_city: string;
//   departure_country: string;
//   departure_date: string;
//   departure_time: string;
//   arrival_airport: string;
//   arrival_code: string;
//   arrival_city: string;
//   arrival_country: string;
//   arrival_date: string;
//   arrival_time: string;
//   price: string;
//   available_seats: number;
// }

// export const Flights: React.FC = () => {
//   const [flights, setFlights] = useState<Flight[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [sortField, setSortField] = useState<keyof Flight>("departure_date");
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [filterAirline, setFilterAirline] = useState<string>("");
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [itemsPerPage, setItemsPerPage] = useState<number>(10);
//   const [totalPages, setTotalPages] = useState<number>(1);

//   // List of airlines for filtering
//   const airlines = [
//     "All",
//     "Nepal Airlines",
//     "Buddha Air",
//     "Yeti Airlines",
//     "Saurya Airlines",
//   ];

//   // Fetch flights data
//   const fetchFlights = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("http://localhost:8000/api/flights/");
//       if (!response.ok) {
//         throw new Error(`Error: ${response.status}`);
//       }
//       const data = await response.json();
//       setFlights(data);
//       setTotalPages(Math.ceil(data.length / itemsPerPage));
//       setError(null);
//     } catch (err) {
//       setError("Failed to fetch flights. Please try again later.");
//       console.error("Error fetching flights:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFlights();
//   }, [itemsPerPage]);

//   // Update total pages when items per page changes
//   useEffect(() => {
//     if (flights.length > 0) {
//       setTotalPages(Math.ceil(flights.length / itemsPerPage));
//     }
//   }, [flights.length, itemsPerPage]);

//   // Handle sort
//   const handleSort = (field: keyof Flight) => {
//     if (sortField === field) {
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//       setSortField(field);
//       setSortOrder("asc");
//     }
//   };

//   // Format date for display
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   // Format time for display
//   const formatTime = (timeString: string) => {
//     // If timeString is already in HH:MM:SS format, just return the HH:MM part
//     if (timeString.includes(":")) {
//       return timeString.substring(0, 5);
//     }

//     // Otherwise, assume it's a date string and extract the time
//     const date = new Date(timeString);
//     return date.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: false,
//     });
//   };

//   // Filter and sort flights
//   const filteredAndSortedFlights = flights
//     .filter((flight) => {
//       // Apply search filter
//       if (searchTerm) {
//         const searchLower = searchTerm.toLowerCase();
//         return (
//           flight.flight_id.toLowerCase().includes(searchLower) ||
//           flight.airline.toLowerCase().includes(searchLower) ||
//           flight.departure_city.toLowerCase().includes(searchLower) ||
//           flight.arrival_city.toLowerCase().includes(searchLower)
//         );
//       }
//       return true;
//     })
//     .filter((flight) => {
//       // Apply airline filter
//       if (filterAirline && filterAirline !== "All") {
//         return flight.airline === filterAirline;
//       }
//       return true;
//     })
//     .sort((a, b) => {
//       // Apply sorting
//       if (sortField === "price") {
//         // Sort by price numerically
//         const priceA = parseFloat(a.price);
//         const priceB = parseFloat(b.price);
//         return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
//       } else if (
//         sortField === "departure_date" ||
//         sortField === "arrival_date"
//       ) {
//         // Sort by date
//         const dateA = new Date(a[sortField]);
//         const dateB = new Date(b[sortField]);
//         return sortOrder === "asc"
//           ? dateA.getTime() - dateB.getTime()
//           : dateB.getTime() - dateA.getTime();
//       } else {
//         // Sort by string fields
//         const valueA = String(a[sortField]).toLowerCase();
//         const valueB = String(b[sortField]).toLowerCase();
//         return sortOrder === "asc"
//           ? valueA.localeCompare(valueB)
//           : valueB.localeCompare(valueA);
//       }
//     });

//   // Paginate flights
//   const paginatedFlights = filteredAndSortedFlights.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   // Handle delete flight (placeholder function)
//   const handleDeleteFlight = (id: number) => {
//     // In a real application, you would call an API to delete the flight
//     console.log(`Delete flight with ID: ${id}`);
//     alert(
//       `Delete flight functionality would be implemented here for flight ID: ${id}`
//     );
//   };

//   // Handle edit flight (placeholder function)
//   const handleEditFlight = (id: number) => {
//     // In a real application, you would navigate to an edit form or open a modal
//     console.log(`Edit flight with ID: ${id}`);
//     alert(
//       `Edit flight functionality would be implemented here for flight ID: ${id}`
//     );
//   };

//   // Generate page numbers for pagination
//   const pageNumbers = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <div className="w-full">
//       {/* Filters and Search */}
//       <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <div className="flex items-center gap-2">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search flights..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-64"
//             />
//             <Filter className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
//           </div>
//           <select
//             value={filterAirline}
//             onChange={(e) => setFilterAirline(e.target.value)}
//             className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//           >
//             <option value="">All Airlines</option>
//             {airlines.map((airline) => (
//               <option key={airline} value={airline}>
//                 {airline}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="flex items-center gap-2">
//           <select
//             value={itemsPerPage}
//             onChange={(e) => setItemsPerPage(Number(e.target.value))}
//             className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//           >
//             <option value={10}>10 per page</option>
//             <option value={20}>20 per page</option>
//             <option value={50}>50 per page</option>
//             <option value={100}>100 per page</option>
//           </select>
//           <button
//             onClick={fetchFlights}
//             className="flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//           >
//             <RefreshCw className="h-4 w-4" />
//             Refresh
//           </button>
//         </div>
//       </div>

//       {/* Loading and Error States */}
//       {loading && (
//         <div className="flex justify-center items-center py-8">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
//           <span className="ml-2">Loading flights...</span>
//         </div>
//       )}

//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
//           <p>{error}</p>
//         </div>
//       )}

//       {/* Flights Table */}
//       {!loading && !error && (
//         <>
//           <div className="overflow-x-auto bg-white rounded-lg shadow">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                     onClick={() => handleSort("flight_id")}
//                   >
//                     <div className="flex items-center">
//                       Flight ID
//                       {sortField === "flight_id" &&
//                         (sortOrder === "asc" ? (
//                           <ChevronUp className="h-4 w-4 ml-1" />
//                         ) : (
//                           <ChevronDown className="h-4 w-4 ml-1" />
//                         ))}
//                     </div>
//                   </th>
//                   <th
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                     onClick={() => handleSort("airline")}
//                   >
//                     <div className="flex items-center">
//                       Airline
//                       {sortField === "airline" &&
//                         (sortOrder === "asc" ? (
//                           <ChevronUp className="h-4 w-4 ml-1" />
//                         ) : (
//                           <ChevronDown className="h-4 w-4 ml-1" />
//                         ))}
//                     </div>
//                   </th>
//                   <th
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                     onClick={() => handleSort("departure_date")}
//                   >
//                     <div className="flex items-center">
//                       Departure
//                       {sortField === "departure_date" &&
//                         (sortOrder === "asc" ? (
//                           <ChevronUp className="h-4 w-4 ml-1" />
//                         ) : (
//                           <ChevronDown className="h-4 w-4 ml-1" />
//                         ))}
//                     </div>
//                   </th>
//                   <th
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                     onClick={() => handleSort("arrival_date")}
//                   >
//                     <div className="flex items-center">
//                       Arrival
//                       {sortField === "arrival_date" &&
//                         (sortOrder === "asc" ? (
//                           <ChevronUp className="h-4 w-4 ml-1" />
//                         ) : (
//                           <ChevronDown className="h-4 w-4 ml-1" />
//                         ))}
//                     </div>
//                   </th>
//                   <th
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                     onClick={() => handleSort("price")}
//                   >
//                     <div className="flex items-center">
//                       Price
//                       {sortField === "price" &&
//                         (sortOrder === "asc" ? (
//                           <ChevronUp className="h-4 w-4 ml-1" />
//                         ) : (
//                           <ChevronDown className="h-4 w-4 ml-1" />
//                         ))}
//                     </div>
//                   </th>
//                   <th
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                     onClick={() => handleSort("available_seats")}
//                   >
//                     <div className="flex items-center">
//                       Seats
//                       {sortField === "available_seats" &&
//                         (sortOrder === "asc" ? (
//                           <ChevronUp className="h-4 w-4 ml-1" />
//                         ) : (
//                           <ChevronDown className="h-4 w-4 ml-1" />
//                         ))}
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {paginatedFlights.length > 0 ? (
//                   paginatedFlights.map((flight) => (
//                     <tr
//                       key={flight.id}
//                       className="hover:bg-gray-50 transition-colors"
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                         {flight.flight_id}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                         {flight.airline}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                         <div className="flex flex-col">
//                           <span className="font-medium">
//                             {flight.departure_city} ({flight.departure_code})
//                           </span>
//                           <span className="text-xs text-gray-500">
//                             {formatDate(flight.departure_date)}
//                           </span>
//                           <span className="text-xs text-gray-500">
//                             {formatTime(flight.departure_time)}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                         <div className="flex flex-col">
//                           <span className="font-medium">
//                             {flight.arrival_city} ({flight.arrival_code})
//                           </span>
//                           <span className="text-xs text-gray-500">
//                             {formatDate(flight.arrival_date)}
//                           </span>
//                           <span className="text-xs text-gray-500">
//                             {formatTime(flight.arrival_time)}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                         <span className="font-medium">
//                           NPR {parseFloat(flight.price).toLocaleString()}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                         <span
//                           className={`${
//                             flight.available_seats < 10
//                               ? "text-red-600 font-medium"
//                               : ""
//                           }`}
//                         >
//                           {flight.available_seats}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                         <div className="flex items-center space-x-2">
//                           <button
//                             onClick={() => handleEditFlight(flight.id)}
//                             className="text-indigo-600 hover:text-indigo-900 transition-colors"
//                           >
//                             <Edit className="h-4 w-4" />
//                           </button>
//                           <button
//                             onClick={() => handleDeleteFlight(flight.id)}
//                             className="text-red-600 hover:text-red-900 transition-colors"
//                           >
//                             <Trash className="h-4 w-4" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan={7}
//                       className="px-6 py-4 text-center text-sm text-gray-500"
//                     >
//                       No flights found matching your criteria.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="mt-4 flex items-center justify-between">
//             <div className="text-sm text-gray-700">
//               Showing{" "}
//               <span className="font-medium">
//                 {(currentPage - 1) * itemsPerPage + 1}
//               </span>{" "}
//               to{" "}
//               <span className="font-medium">
//                 {Math.min(
//                   currentPage * itemsPerPage,
//                   filteredAndSortedFlights.length
//                 )}
//               </span>{" "}
//               of{" "}
//               <span className="font-medium">
//                 {filteredAndSortedFlights.length}
//               </span>{" "}
//               flights
//             </div>
//             <div className="flex space-x-2">
//               <button
//                 onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                 disabled={currentPage === 1}
//                 className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Previous
//               </button>
//               {pageNumbers.map((number) => (
//                 <button
//                   key={number}
//                   onClick={() => setCurrentPage(number)}
//                   className={`px-3 py-1 border rounded-md text-sm font-medium ${
//                     currentPage === number
//                       ? "bg-indigo-600 text-white border-indigo-600"
//                       : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
//                   }`}
//                 >
//                   {number}
//                 </button>
//               ))}
//               <button
//                 onClick={() =>
//                   setCurrentPage(Math.min(totalPages, currentPage + 1))
//                 }
//                 disabled={currentPage === totalPages}
//                 className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };
