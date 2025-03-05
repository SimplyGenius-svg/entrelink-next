"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiSun, FiMoon, FiStar } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InvestorCard from "@/components/InvestorCard";
import InvestorModal from "@/components/InvestorModal";
import { db, collection, addDoc, serverTimestamp } from "@/firebase";

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

export default function InvestorMatcher() {
  // Core states
  const [darkMode, setDarkMode] = useState(false);
  const [startupDescription, setStartupDescription] = useState("");
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);
  const [industryFilter, setIndustryFilter] = useState("");
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

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

  // Fetch investors based on startup description
  const handleSubmit = async () => {
    if (!startupDescription.trim()) {
      toast.error("Please enter a description for your startup.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/process-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: startupDescription }),
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

  return (
    <motion.div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen`}>
      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold">Investor Matcher</h1>
        <button onClick={toggleDarkMode} className="p-2 rounded-full border">
          {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
      </header>

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
