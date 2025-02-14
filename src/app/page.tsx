"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi";
import Background from "@/components/Background";
import Link from "next/link";
import InvestorCard from "@/components/InvestorCard";
import InvestorModal from "@/components/InvestorModal";

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

export default function Home() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [scrambledText, setScrambledText] = useState("Where Ambition Meets Experience.");
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);
  const [loadingText, setLoadingText] = useState("Matching investors...");

  useEffect(() => {
    const originalText = "Find Your Perfect Investor Match Instantly";
    const chars = "!<>-_\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ";
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
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async () => {
    if (!chatInput.trim()) return;
    setLoading(true);
    setProgress(0);

    const loadingMessages = [
      "Analyzing market fit...",
      "Evaluating funding compatibility...",
      "Checking business model alignment...",
      "Reviewing industry expertise...",
      "Finalizing matches..."
    ];

    let step = 0;
    const progressInterval = setInterval(() => {
      if (step >= loadingMessages.length) {
        clearInterval(progressInterval);
      } else {
        setLoadingText(loadingMessages[step]);
        setProgress((step + 1) * 20);
        step++;
      }
    }, 1000);

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
      clearInterval(progressInterval);
    }
  };

  return (
    <motion.div className="relative min-h-screen flex flex-col font-sans bg-gray-50">
      <Background />
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-black tracking-tight">
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
      </header>

      <main className="flex flex-col items-center text-center px-6 py-24">
        <div className="bg-white/90 backdrop-blur-lg px-4 py-2 rounded-full shadow-md border border-gray-300">
          Powered by AI. Supercharged by Founders. 🚀
        </div>
        <motion.h1 className="text-4xl font-bold text-black mt-6">{scrambledText}</motion.h1>
        <div className="mt-6 w-full max-w-lg relative">
          <input
            type="text"
            placeholder="Describe your startup in 140 characters"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            className="w-full p-4 border border-gray-400 rounded-xl shadow-md focus:ring-2 focus:ring-gray-500 transition bg-white"
          />
          <button
            onClick={handleSubmit}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black text-white p-3 rounded-full hover:scale-110 transition"
          >
            {loading ? <span className="animate-spin">⏳</span> : <FiArrowUpRight size={20} />}
          </button>
        </div>
        {loading && <div className="text-gray-600 mt-4">{loadingText}</div>}
        {!loading && investors.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {investors.map((inv) => (
              <InvestorCard key={inv.id} investor={inv} onClick={() => setSelectedInvestor(inv)} />
            ))}
          </div>
        )}
      </main>

      {selectedInvestor && (
        <InvestorModal investor={selectedInvestor} onClose={() => setSelectedInvestor(null)} />
      )}
    </motion.div>
  );
}
