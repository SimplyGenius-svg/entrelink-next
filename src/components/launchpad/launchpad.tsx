"use client";
import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InvestorCard from "@/components/InvestorCard";
import InvestorModal from "@/components/InvestorModal";
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
  homePageMode?: string;
  resultsOnlyMode?: string;
}

// CSS for the loading animation
const loadingStyles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    position: "relative" as const,
    width: "160px",
    height: "200px",
    overflow: "visible",
  },
  loadingText: {
    color: "#555",
    fontFamily: "Arial, sans-serif",
    fontSize: "18px",
    marginTop: "15px",
    fontWeight: 500,
  },
  dots: {
    display: "inline-flex",
    marginLeft: "5px",
  },
  dot: {
    display: "inline-block",
    width: "6px",
    height: "6px",
    marginLeft: "3px",
    backgroundColor: "#555",
    borderRadius: "50%",
    animation: "bounce 1.2s infinite ease-in-out",
  },
};


// Add this style tag to the component
const LoadingAnimationStyles = () => (
  <style jsx global>{`
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }
    
    @keyframes fallReset {
      0% { transform: translateY(-150px) scale(1); opacity: 0; }
      20% { transform: translateY(0) scale(1.05); opacity: 1; }
      30% { transform: translateY(-5px) scale(0.98); }
      40% { transform: translateY(0) scale(1); }
      70% { transform: translateY(0) scale(1); opacity: 1; }
      85% { transform: translateY(0) scale(1); opacity: 0.5; }
      90% { transform: translateY(0) scale(1); opacity: 0.2; }
      100% { transform: translateY(0) scale(1); opacity: 0; }
    }
    
    .loading-dot {
      animation: bounce 1.2s infinite ease-in-out;
    }
    
    .loading-dot:nth-child(1) { animation-delay: 0s; }
    .loading-dot:nth-child(2) { animation-delay: 0.2s; }
    .loading-dot:nth-child(3) { animation-delay: 0.4s; }
    
    .layer-group {
      animation: fallReset 3s infinite ease-in-out;
      opacity: 0;
    }
    
    .layer-group:nth-child(3) { animation-delay: 0s; }
    .layer-group:nth-child(4) { animation-delay: 0.3s; }
    .layer-group:nth-child(5) { animation-delay: 0.6s; }
  `}</style>
);

export default function LaunchPad({ initialQuery = "" }: LaunchPadProps) {
  const [startupDescription, setStartupDescription] = useState(initialQuery);
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [charCount, setCharCount] = useState(initialQuery.length);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const MAX_CHARS = 140;
  const loadingTexts = ["Analyzing Prompt", "Fetching Investors", "Scouring Database", "Matching Startups"];

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Loading text rotation effect
  useEffect(() => {
    if (!loading) return;
    
    const interval = setInterval(() => {
      setLoadingTextIndex((prevIndex) => (prevIndex + 1) % loadingTexts.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [loading, loadingTexts.length]);

  const fetchInvestors = async (searchQuery: string) => {
    setLoading(true);
    setLoadingTextIndex(0); // Reset the text index
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
      return; // No error toast, just don't do anything
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
      {/* Integrated Loading Overlay Animation */}
      {loading && (
        <div style={loadingStyles.overlay}>
          <LoadingAnimationStyles />
          <div style={loadingStyles.container}>
            <svg style={loadingStyles.logo} viewBox="-20 -20 200 250" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#A857A7" />
                  <stop offset="100%" stopColor="#2A0C40" />
                </linearGradient>
              </defs>
              
              {/* Bottom Brick */}
              <g className="layer-group">
                <polygon points="60,110 120,140 120,155 60,185 0,155 0,140" 
                  stroke="url(#gradient)" strokeWidth="4" fill="white"/>
              </g>
              
              {/* Middle Brick */}
              <g className="layer-group">
                <polygon points="60,65 120,95 120,110 60,140 0,110 0,95"
                  stroke="url(#gradient)" strokeWidth="4" fill="white"/>
              </g>
              
              {/* Top Brick */}
              <g className="layer-group">
                <polygon points="60,20 120,50 120,65 60,95 0,65 0,50"
                  stroke="url(#gradient)" strokeWidth="4" fill="white"/>
              </g>
            </svg>
            <div style={loadingStyles.loadingText}>
              {loadingTexts[loadingTextIndex]}
              <span style={loadingStyles.dots}>
                <span className="loading-dot" style={loadingStyles.dot}></span>
                <span className="loading-dot" style={loadingStyles.dot}></span>
                <span className="loading-dot" style={loadingStyles.dot}></span>
              </span>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content - Centered */}
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center mt-10">
        <h1 className="text-3xl font-bold mb-6 text-center z-0">Powered by AI. Supercharged by founders.</h1>
        
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
            disabled={loading || !startupDescription.trim()}
          >
            {loading ? "Searching..." : "Find Investors"}
          </Button>
        </div>
      </div>

      {/* Rest of your component remains unchanged */}
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
              {investors.slice(0, showMore ? investors.length : 15).map((inv) => (
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
                    onClick={() => setShowMore(true)}
                  >
                    Load More
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
