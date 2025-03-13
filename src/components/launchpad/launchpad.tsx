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

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

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
      {/* Startup Description Input */}
      <div className="max-w-2xl w-full mt-10">
        <textarea
          ref={textAreaRef}
          placeholder="Describe your startup to find the perfect investor match..."
          value={startupDescription}
          onChange={(e) => setStartupDescription(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSubmit()}
          rows={2}
          className="w-full p-4 border rounded-lg focus:outline-none"
        />
        <Button className="mt-3 w-full" onClick={handleSubmit} disabled={loading}>
          {loading ? "Searching..." : "Find Investors"}
        </Button>
      </div>

      {/* Investor Results */}
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
                onOpenSidebar={handleOpenSidebar} // ✅ Ensures InvestorCard receives this
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

      <ToastContainer position="top-right" autoClose={3000} />

      {/* Investor Modal */}
      {selectedInvestor && !showSidebar && (
        <InvestorModal investor={selectedInvestor} onClose={handleCloseModal} onOpenSidebar={handleOpenSidebar} />
      )}

      {/* Email Sidebar */}
      {showSidebar && selectedInvestor && <EmailSidebar investor={selectedInvestor} onClose={handleCloseSidebar} />}
    </div>
  );
}
