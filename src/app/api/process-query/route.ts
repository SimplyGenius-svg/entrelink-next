import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Extract Startup Attributes from OpenAI
async function extractStartupAttributes(query: string) {
  console.log("🔍 Extracting startup attributes for:", query);

  const prompt = `
  Analyze the following startup idea and extract:
  - Industry
  - Business Model
  - Funding Stage
  - Target Market
  Return as JSON format.

  Startup Idea: "${query}"
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: prompt }],
    });

    const text = response.choices[0]?.message?.content;
    console.log("🧠 OpenAI Response:", text);

    if (!text) {
      throw new Error("OpenAI response is empty.");
    }

    return JSON.parse(text);
  } catch (error) {
    console.error("❌ Error extracting startup attributes:", error);
    throw new Error("Failed to extract startup attributes.");
  }
}

// Fetch Investors from Apollo API
async function fetchInvestorsFromApollo(attributes: any) {
  console.log("📡 Fetching investors for attributes:", attributes);

  const API_KEY = process.env.APOLLO_API_KEY;
  if (!API_KEY) {
    console.error("❌ Apollo API Key is missing");
    throw new Error("Apollo API Key is missing in .env.local");
  }

  // **Expand search filters**
  const industryFilters = [
    attributes.industry,
    "Tech",
    "Finance",
    "AI",
    "Biotech",
    "SaaS",
    "VC Funding",
  ].filter(Boolean);

  const fundingStageFilters = [
    attributes.funding_stage,
    "Pre-Seed",
    "Seed",
    "Series A",
    "Series B",
    "Growth",
  ].filter(Boolean);

  const marketFilters = [
    attributes.market,
    "North America",
    "Europe",
    "Asia",
    "Global",
  ].filter(Boolean);

  try {
    const response = await fetch("https://api.apollo.io/api/v1/mixed_people/search", {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filters: {
          industry: industryFilters[Math.floor(Math.random() * industryFilters.length)],
          funding_stage: fundingStageFilters[Math.floor(Math.random() * fundingStageFilters.length)],
          preferred_markets: [marketFilters[Math.floor(Math.random() * marketFilters.length)]],
        },
        sort_by: "random",
        limit: 20, // **Ensure more results are retrieved**
      }),
    });

    const text = await response.text();
    console.log("📝 Raw Apollo Response:", text);

    if (!response.ok) {
      console.error(`❌ Apollo API Error (Status: ${response.status}):`, text);
      throw new Error(`Apollo API request failed with status ${response.status}`);
    }

    const data = JSON.parse(text);
    console.log("📊 Found Investors:", data.people.length);

    // **Handle empty response gracefully**
    if (!data.people || data.people.length === 0) {
      console.warn("⚠️ No investors found, retrying with default filters...");
      return [];
    }

    let uniqueInvestors = [...new Set(data.people.map((inv: any) => JSON.stringify(inv)))].map((inv: any) =>
      JSON.parse(inv)
    );

    uniqueInvestors = uniqueInvestors.sort(() => Math.random() - 0.5).slice(0, 5);

    return uniqueInvestors;
  } catch (error) {
    console.error("❌ Apollo API Request Failed:", error);
    throw new Error("Failed to fetch investors from Apollo.");
  }
}

// Handle API Requests
export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();
    if (!query) return NextResponse.json({ error: "No query provided" }, { status: 400 });

    // Step 1: Extract attributes using OpenAI
    const attributes = await extractStartupAttributes(query);

    // Step 2: Fetch matching investors
    const investors = await fetchInvestorsFromApollo(attributes);

    return NextResponse.json({ investors });
  } catch (error) {
    console.error("❌ Error processing request:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to process request" },
      { status: 500 }
    );
  }
}
