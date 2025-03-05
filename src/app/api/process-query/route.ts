import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const defaultFilters = {
  person_titles: ["Investor", "Angel", "Angel Investor", "Venture Capitalist", "VC", "Founder", "CEO", "CTO", "COO", "CFO", "CMO", "Scout"],
  person_seniorities: ["owner", "founder", "c_suite", "partner"],
};

// Define interfaces for structured data
interface StartupAttributes {
  industries: string[];
  stage: {
    startup_stage: string;
    appropriate_investor_title_prefix: string[];
  };
}

interface Query {
  person_titles: string[];
  person_seniorities: string[];
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

/**
 * Extracts structured startup attributes from a user query using OpenAI.
 */
async function extractStartupAttributes(query: string): Promise<Query> {
  console.log("🔍 Extracting startup attributes for:", query);

  const systemMessage = "You are an expert that extracts startup attributes from ideas. Return the output as valid JSON without additional text. Reply using keywords only.";
  const userMessage = `
Analyze the following startup idea and extract the following attributes:
- Industry
- Funding Stage

Desired output is an array of keywords to be used in a search engine to find relevant investors.

Startup Idea: "${query}"

Use schema:
{
  "$schema": "http://json-schema.org/draft-04/schema",
  "type": "object",
  "properties": {
    "industries": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "stage": {
      "type": "object",
      "properties": {
        "startup_stage": {
          "type": "string"
        },
        "appropriate_investor_title_prefix": {
          "type": "array",
          "description": "The appropriate prefix for a title like Pre-Seed, Seed, [Industry], etc. Do not include the term 'Investor' in the prefix.",
          "items": {
            "type": "string"
          }
        }
      },
      "required": ["startup_stage", "appropriate_investor_title_prefix"]
    }
  },
  "required": ["industries", "stage"]
}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: userMessage },
      ],
      response_format: { type: "json_object" }, // ✅ Fixed response format
    });

    const text = response.choices[0]?.message?.content;
    if (!text) throw new Error("OpenAI response is empty.");

    // Parse the output as JSON
    const data = JSON.parse(text) as StartupAttributes;

    // Generate search queries
    const allPrefixes = data.industries
      .map((i) => i.toLowerCase().trim())
      .concat(data.stage.appropriate_investor_title_prefix.map((i) => i.toLowerCase().trim()))
      .flatMap((k) => defaultFilters.person_titles.map((t) => `${k} ${t}`))
      .map((t) => t.trim().toLowerCase());

    return {
      person_titles: allPrefixes,
      person_seniorities: defaultFilters.person_seniorities,
    };
  } catch (err) {
    console.error("❌ Error extracting startup attributes:", err);
    throw new Error("Failed to extract startup attributes.");
  }
}

/**
 * Fetches matching investors from Apollo API based on startup attributes.
 */
async function fetchInvestorsFromApollo(attributes: Query): Promise<Investor[]> {
  console.log("📡 Fetching investors for attributes:", attributes);

  const API_KEY = process.env.APOLLO_API_KEY;
  if (!API_KEY) throw new Error("Apollo API Key is missing in .env.local");

  try {
    // Reduce the number of person_titles to fit Apollo's request limits
    const MAX_TITLES = 10; // ✅ Reduced to avoid "Value too long" errors
    const limitedPersonTitles = attributes.person_titles.slice(0, MAX_TITLES);
    console.log(`🔹 Using only ${MAX_TITLES} person_titles to prevent API errors.`);

    const response = await fetch("https://api.apollo.io/api/v1/mixed_people/search", {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        person_titles: limitedPersonTitles,
        person_seniorities: attributes.person_seniorities,
      }),
    });

    const text = await response.text();
    console.log("📝 Raw Apollo Response:", text);

    if (!response.ok) {
      console.error(`❌ Apollo API request failed with status ${response.status} - ${text}`);
      throw new Error(`Apollo API request failed with status ${response.status}`);
    }

    const data = JSON.parse(text);
    return (data.people || []).map((person: any) => ({
      id: String(person.id || ""),
      name: String(person.name || "Unknown"),
      industry: String(person.organization?.name || "Unknown Industry"),
      linkedin_url: String(person.linkedin_url || "#"),
      match_score: Math.floor(Math.random() * 10) + 90, // Score between 90-100
      photo_url: String(person.photo_url || "/default-profile.png"),
      investment_thesis: String(person.investment_thesis || "No thesis available"),
      past_investments: Array.isArray(person.past_investments) ? person.past_investments.map(String) : [],
      preferred_check_size: String(person.preferred_check_size || "Varies"),
    }));
  } catch (err) {
    console.error("❌ Apollo API Request Failed:", err);
    throw new Error("Failed to fetch investors from Apollo.");
  }
}

/**
 * Handles API requests to find investors based on a startup query.
 */
export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();
    if (!query) {
      return NextResponse.json({ error: "No query provided" }, { status: 400 });
    }

    // Extract dynamic startup attributes based on the user's query
    const attributes = await extractStartupAttributes(query);

    // Fetch investors using the dynamically generated filters
    const investors = await fetchInvestorsFromApollo(attributes);

    return NextResponse.json({ investors });
  } catch (err) {
    console.error("❌ Error processing request:", err);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
