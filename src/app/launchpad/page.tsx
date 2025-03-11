"use client";
import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiSun, FiMoon, FiStar } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InvestorCard from "@/components/InvestorCard";
import InvestorModal from "@/components/InvestorModal";
import { db, collection, addDoc, serverTimestamp } from "@/firebase";
import { useRouter } from "next/navigation";

interface Investor {
  id: string;
  name: string;
  industry: string;
  linkedin_url: string;
  match_score: number;
  photo_url: string;
  headline: string;
  match_explanation: string[];
}

interface LaunchPadProps {
  homePageMode?: boolean;
  resultsOnlyMode?: boolean;
  initialQuery?: string;
  query?: string;
  onSubmit?: (query: string) => void;
  showResultsInline?: boolean;
}

export default function LaunchPad({ 
  homePageMode = false, 
  resultsOnlyMode = false,
  initialQuery = "",
  query = "", 
  onSubmit,
  showResultsInline = false
}: LaunchPadProps) {
  const router = useRouter();
  
  // States
  const [darkMode, setDarkMode] = useState(false);
  const [startupDescription, setStartupDescription] = useState(initialQuery);
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);
  const [industryFilter, setIndustryFilter] = useState("");
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Load results if query is provided (resultsOnlyMode)
  useEffect(() => {
    if (resultsOnlyMode && query) {
      fetchInvestors(query);
    }
  }, [resultsOnlyMode, query]);

  // Save query and results to Firebase
  const saveQueryToFirebase = async (query: string, results: Investor[]) => {
    try {
      await addDoc(collection(db, "entrelink_queries"), {
        query,
        matches: results,
        timestamp: serverTimestamp(),
      });
      console.log("Query saved successfully!");
    } catch (error) {
      console.error("Error saving query:", error);
    }
  };

  // Fetch investors based on query
  const fetchInvestors = async (searchQuery: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/process-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery }),
      });
      
      if (!response.ok) throw new Error("API request failed");
      
      const data = await response.json();
      setInvestors(data.investors || []);
      toast.success("Investors loaded successfully!");
      await saveQueryToFirebase(startupDescription, data.investors || []);
    } catch (error) {
      console.error("Error fetching investors:", error);
      toast.error("Failed to fetch investors.");
      setInvestors([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!startupDescription.trim()) {
      toast.error("Please enter a description for your startup.");
      return;
    }
    
    if (homePageMode && onSubmit) {
      // For homepage mode with inline results, call the parent's onSubmit
      onSubmit(startupDescription);
      return;
    }
    
    if (homePageMode && !showResultsInline) {
      // For standard homepage mode without inline results, redirect
      window.location.href = `/launchpad?query=${encodeURIComponent(startupDescription)}`;
      return;
    }
    
    // Default behavior - fetch and display results
    await fetchInvestors(startupDescription);
  };

  // Allow submit on Enter (without Shift)
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Toggle dark/light mode
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // Toggle investor favorite status
  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter investors by industry
  const filteredInvestors = industryFilter
    ? investors.filter((inv) =>
        inv.industry.toLowerCase().includes(industryFilter.toLowerCase())
      )
    : investors;

  // Results-only mode (for showing just the investor cards)
  if (resultsOnlyMode) {
    return (
      <div>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <svg className="animate-spin h-10 w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : filteredInvestors.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInvestors.map((inv) => (
              <div key={inv.id} className="relative">
                <InvestorCard investor={inv} onSelect={() => setSelectedInvestor(inv)} />
                <button
                  onClick={() => toggleFavorite(inv.id)}
                  className="absolute top-2 right-2 bg-white dark:bg-gray-700 p-1 rounded-full shadow"
                >
                  <FiStar size={18} color={favorites[inv.id] ? "gold" : "gray"} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10">
            No investors found matching your criteria. Try modifying your search.
          </p>
        )}
        
        {selectedInvestor && (
          <InvestorModal
            investor={selectedInvestor}
            onClose={() => setSelectedInvestor(null)}
          />
        )}
      </div>
    );
  }

  // Simplified version for homepage
  if (homePageMode) {
    return (
      <div className="w-full relative">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            <textarea
              ref={textAreaRef}
              placeholder="Describe your startup to find the perfect investor match..."
              value={startupDescription}
              onChange={(e) => setStartupDescription(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
              className="w-full p-4 bg-transparent text-gray-800 focus:outline-none resize-none sm:rounded-r-none"
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 flex items-center justify-center transition-colors sm:w-auto w-full ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </span>
              ) : (
                "Find Investors"
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Full component for standalone page
  return (
    <motion.div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen`}>
      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold">Investor Matcher</h1>
        <button onClick={toggleDarkMode} className="p-2 rounded-full border">
          {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
      </header>

      {/* Rest of your original component */}
      {/* Main Content */}
      <main className="p-6">
        {/* Chatbox Input */}
        <section className="mb-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow relative">
            <textarea
              ref={textAreaRef}
              placeholder="Describe your startup..."
              value={startupDescription}
              onChange={(e) => setStartupDescription(e.target.value)}
              onKeyDown={handleKeyDown}
              maxLength={140}
              rows={2}
              className="w-full p-3 bg-transparent text-black dark:text-white focus:outline-none"
            />
            <motion.button
              onClick={handleSubmit}
              disabled={loading}
              className={`absolute right-4 bottom-4 bg-black text-white p-3 rounded-full ${
                loading ? "opacity-70 cursor-not-allowed" : "hover:scale-110 transition"
              }`}
            >
              {loading ? "⏳" : <FiArrowRight size={20} />}
            </motion.button>
          </div>
          <input
            type="text"
            placeholder="Filter by industry..."
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="w-full mt-4 p-3 border rounded"
          />
        </section>

        {/* Investor Results */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Matching Investors</h2>
          {loading ? (
            <p>Loading investors...</p>
          ) : filteredInvestors.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredInvestors.map((inv) => (
                <div key={inv.id} className="relative">
                  <InvestorCard investor={inv} onSelect={() => setSelectedInvestor(inv)} />
                  <button
                    onClick={() => toggleFavorite(inv.id)}
                    className="absolute top-2 right-2 bg-white dark:bg-gray-700 p-1 rounded-full shadow"
                  >
                    <FiStar size={18} color={favorites[inv.id] ? "gold" : "gray"} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            startupDescription && <p>No investors found. Try a different description.</p>
          )}
        </section>
      </main>

      {/* Investor Detail Modal with integrated investor actions */}
      {selectedInvestor && (
        <InvestorModal
          investor={selectedInvestor}
          onClose={() => setSelectedInvestor(null)}
        />
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </motion.div>
  );
}
