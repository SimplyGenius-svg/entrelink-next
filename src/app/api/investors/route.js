import { fetchInvestors } from "@/lib/fetchInvestors";

export async function GET() {
  try {
    // Fetch investors
    const investors = await fetchInvestors();

    // Validate the result is an array
    if (!Array.isArray(investors)) {
      throw new Error("Invalid response: Expected an array of investors.");
    }

    // Return the data
    return new Response(JSON.stringify(investors), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      status: 200,
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching investors:", error);

    // Return error response
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
