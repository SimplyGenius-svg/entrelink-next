"use client";

import { useEffect, useState } from "react";

const Dashboard = () => {
  const [investors, setInvestors] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/investors"); // API call
        const data = await response.json(); // Parse JSON
        console.log(data); // Check API response structure
        if (Array.isArray(data)) {
          setInvestors(data); // Update state if data is an array
        } else {
          setInvestors(data.investors || []); // Adjust for nested structure
        }
      } catch (error) {
        console.error("Error fetching investors:", error);
        setError("Failed to load investor data.");
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Investor Database</h1>
      <div className="investor-list">
        {Array.isArray(investors) && investors.length > 0 ? (
          investors.map((investor) => (
            <div key={investor.id} className="investor-card">
              <h2>{investor.name}</h2>
              <p>Firm: {investor.firm}</p>
              <p>Location: {investor.location}</p>
            </div>
          ))
        ) : (
          <p>No investors available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
