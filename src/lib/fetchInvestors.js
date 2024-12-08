import axios from "axios";

const APOLLO_API_BASE_URL = "https://api.apollo.io/v1"; // Replace with the actual Apollo API endpoint

export async function fetchInvestors() {
  try {
    const response = await axios.get(`${APOLLO_API_BASE_URL}/investors`, {
      headers: {
        Authorization: `Bearer ${process.env.APOLLO_API_KEY}`, // Your API key
      },
    });
    return response.data; // Return the API response (investor data)
  } catch (error) {
    console.error("Error fetching investors:", error);
    throw new Error("Failed to fetch investor data.");
  }
}
