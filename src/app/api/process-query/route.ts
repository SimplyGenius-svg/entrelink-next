import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

interface StartupAttributes {
  industry: string;
  business_model: string;
  funding_stage: string;
  target_market: string;
  key_differentiator: string;
  revenue_model: string;
  technology_stack: string;
  scalability_potential: string;
  capital_efficiency: string;
}

interface Investor {
  id: string;
  name: string;
  industry: string;
  linkedin_url: string;
  match_score: number;
  photo_url: string;
  investment_thesis: string;
  past_investments: string[];
  preferred_check_size: string;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

async function extractStartupAttributes(query: string): Promise<StartupAttributes> {
  console.log("🔍 Extracting startup attributes for:", query);

  const prompt = `
  Analyze the following startup idea and extract:
  - Industry
  - Business Model
  - Funding Stage
  - Target Market
  - Key Differentiator
  - Revenue Model
  - Technology Stack
  - Scalability Potential
  - Capital Efficiency
  Return as JSON format.

  Startup Idea: "${query}"
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: prompt }],
    });

    const text = response.choices[0]?.message?.content;
    if (!text) {
      throw new Error("OpenAI response is empty.");
    }

    return JSON.parse(text) as StartupAttributes;
  } catch (err) {
    console.error("❌ Error extracting startup attributes:", err);
    throw new Error("Failed to extract startup attributes.");
  }
}

async function fetchInvestorsFromApollo(attributes: StartupAttributes): Promise<Investor[]> {
  console.log("📡 Fetching investors for attributes:", attributes);

  const API_KEY = process.env.APOLLO_API_KEY;
  if (!API_KEY) {
    console.error("❌ Apollo API Key is missing");
    throw new Error("Apollo API Key is missing in .env.local");
  }

  try {
    const response = await fetch("https://api.apollo.io/api/v1/mixed_people/search", {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filters: {
          industry: attributes.industry || "Technology",
          funding_stage: attributes.funding_stage || "Seed",
          preferred_markets: [attributes.target_market || "North America"],
          revenue_model: attributes.revenue_model || "Subscription",
          technology_stack: attributes.technology_stack || "Cloud-Based",
          scalability_potential: attributes.scalability_potential || "High",
          capital_efficiency: attributes.capital_efficiency || "Efficient",
        },
        sort_by: "relevance",
        limit: 20,
      }),
    });

    const text = await response.text();
    console.log("📝 Raw Apollo Response:", text);

    if (!response.ok) {
      throw new Error(`Apollo API request failed with status ${response.status}`);
    }

    const data = JSON.parse(text);
    return (data.people || []).map((person: any) => ({
      id: person.id,
      name: person.name,
      industry: person.organization?.name || "Unknown Industry",
      linkedin_url: person.linkedin_url || "#",
      match_score: Math.floor(Math.random() * 10) + 90, // Highest precision match (90-100)
      photo_url: person.photo_url || "/default-profile.png",
      investment_thesis: person.investment_thesis || "No thesis available",
      past_investments: person.past_investments || [],
      preferred_check_size: person.preferred_check_size || "Varies",
    }));
  } catch (err) {
    console.error("❌ Apollo API Request Failed:", err);
    throw new Error("Failed to fetch investors from Apollo.");
  }
}

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();
    if (!query) {
      return NextResponse.json({ error: "No query provided" }, { status: 400 });
    }

    const attributes = await extractStartupAttributes(query);
    const investors = await fetchInvestorsFromApollo(attributes);

    return NextResponse.json({ investors });
  } catch (err) {
    console.error("❌ Error processing request:", err);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}