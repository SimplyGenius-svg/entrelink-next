"use client";
import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InvestorCard from "@/components/InvestorCard";
import InvestorModal from "@/components/InvestorModal";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import EmailSidebar from "@/components/EmailSidebar";
import { LoadingOverlay } from "@/components/ui/loading-animation"; // Import the loading component

interface Investor {
  id: string;
  name: string;
  company?: string;
  industry: string;
  location?: string;
  linkedin_url: string;
  email?: string;
  match_score: number;
  photo_url?: string;
  headline: string;
  match_explanation: string[];
}

interface LaunchPadProps {
  initialQuery?: string;
  onSubmit?: (query: string) => void;
  homePageMode?: string;
  resultsOnlyMode?: string;
}

export default function LaunchPad({ initialQuery = "", onSubmit }: LaunchPadProps) {
  const router = useRouter();
  const [startupDescription, setStartupDescription] = useState(initialQuery);
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [charCount, setCharCount] = useState(initialQuery.length);
  const MAX_CHARS = 140;

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const fetchInvestors = async (searchQuery: string) => {
    setLoading(true);
    const startTime = Date.now();
    
    try {
      const response = await fetch("/api/process-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery }),
      });
      
      if (!response.ok) throw new Error("API request failed");
      const data = await response.json();
      
      // Store the results but don't update state yet
      const results = data.investors || [];
      
      // Calculate how long the fetch took
      const elapsedTime = Date.now() - startTime;
      const minLoadingTime = 9000; // 9 seconds for 3 animation cycles
      
      // If the fetch was faster than our minimum time, add a delay
      if (elapsedTime < minLoadingTime) {
        await new Promise(resolve => setTimeout(resolve, minLoadingTime - elapsedTime));
      }
      
      // Now update the state
      setInvestors(results);
      toast.success("Investors loaded successfully!");
    } catch (error) {
      console.error("Error fetching investors:", error);
      toast.error("Failed to fetch investors.");
      setInvestors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!startupDescription.trim()) {
      toast.error("Please enter a description for your startup.");
      return;
    }
    await fetchInvestors(startupDescription);
  };

  const handleOpenSidebar = (investor: Investor) => {
    setSelectedInvestor(investor);
    setShowSidebar(true);
  };

  const handleCloseSidebar = () => setShowSidebar(false);
  const handleCloseModal = () => setSelectedInvestor(null);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Show loading overlay when loading */}
      {loading && <LoadingOverlay />}
      
      {/* Main Content - Centered */}
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center mt-10">
        <h1 className="text-3xl font-bold mb-6 text-center z-0">Find your next investor!</h1>
        
        {/* Startup Description Input */}
        <div className="w-full">
          <textarea
            ref={textAreaRef}
            placeholder="Describe your startup to find the perfect investor match..."
            value={startupDescription}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CHARS) {
                setStartupDescription(e.target.value);
                setCharCount(e.target.value.length);
              }
            }}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSubmit()}
            rows={2}
            className="w-full p-4 border rounded-lg focus:outline-none border-gray-300 bg-white resize-none"
            maxLength={MAX_CHARS}
          />
          <small className="text-gray-500 block mt-1 mb-2">{charCount}/{MAX_CHARS} characters</small>
          <Button 
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white" 
            onClick={handleSubmit} 
            disabled={loading}
          >
            {loading ? "Searching..." : "Find Investors"}
          </Button>
        </div>
      </div>

      {/* Investor Results - Only shown when there are results */}
      {(investors.length > 0) && (
        <div className="mt-10 max-w-4xl w-full">
          <h2 className="text-xl font-bold mb-4 text-center">Investor Results</h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading investors...</p>
          ) : investors.length === 0 ? (
            <p className="text-center text-gray-500">No investors found. Try refining your search.</p>
          ) : (
            <>
              {investors.slice(0, showMore || signedIn ? investors.length : 15).map((inv) => (
                <InvestorCard
                  key={inv.id}
                  investor={inv}
                  onSelect={() => setSelectedInvestor(inv)}
                  onOpenSidebar={handleOpenSidebar}
                  className="mb-4"
                />
              ))}
              {!showMore && investors.length > 15 && (
                <div className="text-center mt-6">
                  <Button
                    className="px-6 py-3 text-white bg-gray-500"
                    disabled={!signedIn}
                    onClick={() => setShowMore(true)}
                  >
                    {signedIn ? "Load More" : "Sign in to Unlock More"}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />

      {/* Investor Modal */}
      {selectedInvestor && !showSidebar && (
        <InvestorModal investor={selectedInvestor} onClose={handleCloseModal} onOpenSidebar={handleOpenSidebar} />
      )}

      {/* Email Sidebar - rendered independently to avoid nesting issues */}
      {showSidebar && selectedInvestor && (
        <EmailSidebar investor={selectedInvestor} onClose={handleCloseSidebar} />
      )}
    </div>
  );
}
