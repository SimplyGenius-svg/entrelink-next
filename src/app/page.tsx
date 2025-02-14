"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi";
import Background from "@/components/Background";
import Link from "next/link";

export default function Home() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [scrambledText, setScrambledText] = useState("Where Ambition Meets Experience.");
  const [investors, setInvestors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedInvestor, setSelectedInvestor] = useState<any | null>(null);

  useEffect(() => {
    const originalText = "Ultimate Investor DataBridge for Entrepreneurs";
    const chars = "!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let iteration = 0;

    const interval = setInterval(() => {
      setScrambledText(
        originalText
          .split("")
          .map((letter, index) =>
            index < iteration ? originalText[index] : chars[Math.floor(Math.random() * chars.length)]
          )
          .join("")
      );

      if (iteration >= originalText.length) clearInterval(interval);
      iteration += 1;
    }, 35);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async () => {
    if (!chatInput.trim()) return;

    setLoading(true);
    setProgress(0);

    try {
      const response = await fetch("/api/process-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: chatInput }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      setInvestors(data.investors || []);
    } catch (error) {
      alert("Failed to fetch investors.");
      setInvestors([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="relative min-h-screen flex flex-col font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Background />

      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md border-b border-gray-200">
        <div className="container mx-auto flex items-center justify-between h-16 px-6">
          <Link href="/" className="text-xl font-semibold text-black tracking-tight">
            EntreLink
          </Link>
          <nav className="hidden md:flex space-x-6">
            {["Database", "Features", "Resources", "Pricing"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} className="text-sm font-medium text-gray-800 hover:text-black transition">
                {item}
              </Link>
            ))}
          </nav>
          <button className="md:hidden text-black" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
            {mobileNavOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative flex flex-col items-center text-center px-6 py-24">
        <div className="bg-white/90 backdrop-blur-lg px-4 py-2 rounded-full shadow-md border border-gray-300">
          Powered by AI. Supercharged by Founders. 🚀
        </div>

        <motion.h1 id="scramble-text" className="text-3xl md:text-4xl font-bold text-black mt-6">
          {scrambledText}
        </motion.h1>

        <div className="mt-6 w-full max-w-lg relative">
          <input
            type="text"
            placeholder="Describe your startup in 140 characters"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            className="w-full p-4 border border-gray-400 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition backdrop-blur-md bg-white/50"
          />
          <button
            onClick={handleSubmit}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black text-white p-3 rounded-full hover:scale-110 transition"
          >
            {loading ? <span className="animate-spin">⏳</span> : <FiArrowUpRight size={20} />}
          </button>
        </div>

        {/* Loading Progress Bar */}
        {loading && (
          <div className="w-full max-w-lg mt-4">
            <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Matching investors...</p>
          </div>
        )}

        {/* Investor List */}
        {!loading && investors.length > 0 && (
          <div className="mt-6 w-full max-w-lg bg-white/80 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-black mb-2">Matching Investors:</h2>
            <ul className="space-y-4">
              {investors.map((inv, index) => (
                <li
                  key={index}
                  className="p-4 flex items-center bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition cursor-pointer"
                  onClick={() => setSelectedInvestor(inv)}
                >
                  <img src={inv.photo_url} alt={inv.name} className="w-12 h-12 rounded-full mr-4" />
                  <div className="flex-grow">
                    <p className="font-medium text-black">{inv.name}</p>
                    <p className="text-gray-600 text-sm">{inv.industry}</p>
                  </div>
                  <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">{inv.match_score}% Match</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Modal for Investor Details */}
        {selectedInvestor && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-lg w-full relative">
              <button className="absolute top-2 right-2 text-gray-600 hover:text-black" onClick={() => setSelectedInvestor(null)}>✖</button>
              <img src={selectedInvestor.photo_url} alt={selectedInvestor.name} className="w-20 h-20 rounded-full mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-black text-center">{selectedInvestor.name}</h2>
              <p className="text-center text-gray-700">{selectedInvestor.headline}</p>
              <div className="mt-4">
                <a href={selectedInvestor.linkedin_url} target="_blank" className="block bg-blue-500 text-white text-center py-2 rounded-lg">
                  View LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        )}
      </main>
    </motion.div>
  );
}
