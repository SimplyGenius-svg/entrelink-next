"use client";

import { Button } from "@/components/ui/button";

const topMatches = [
  { name: "TechVentures Capital", match: 95 },
  { name: "Green Future Fund", match: 88 },
  { name: "Innovation Spark", match: 82 },
];

export default function InvestorMatches() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Top Investor Matches</h3>
      <ul className="space-y-4">
        {topMatches.map((investor, index) => (
          <li key={index} className="flex items-center justify-between">
            <span className="text-sm font-medium">{investor.name}</span>
            <span className="text-sm font-bold text-green-600">{investor.match}% Match</span>
          </li>
        ))}
      </ul>
      <Button variant="link" className="mt-4 w-full">
        View All Matches
      </Button>
    </div>
  );
}
