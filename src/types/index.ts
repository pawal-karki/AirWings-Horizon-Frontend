export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

export interface Flight {
  flight_id: string;
  departure_city: string;
  arrival_city: string;
  departure_time: string;
  arrival_time: string;
  price: number;
  available_seats: number;
}

// export interface Booking {
//   id: string;
//   userId: string;
//   flightId: string;
//   passengerName: string;
//   passengerEmail: string;
//   bookingDate: string;
//   status: 'confirmed' | 'pending' | 'cancelled';
// }

export interface ScheduleItem {
  id: number;
  flight: number;
  frequency: string;
  status: string;
  flight_details: Flight;
}
