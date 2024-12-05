import { fetchInvestors } from "@/lib/fetchInvestors";

export async function GET(req) {
  try {
    const investors = await fetchInvestors(); // Ensure this function returns an array
    return new Response(JSON.stringify(investors), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
