import axios from "axios";
import { Flight } from "../types";

export const searchFlights = async (
  departureCity: string,
  arrivalCity: string
): Promise<Flight[]> => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/flights/search/",
      {
        params: {
          departure_city: departureCity,
          arrival_city: arrivalCity,

        },
      }
    );
    return response.data; // Assuming the API returns the flight data in response.data
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw error; // Propagate the error to handle it in the component
  }
};
