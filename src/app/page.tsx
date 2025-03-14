"use client";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stats } from "@/components/stats";
import { CompanyLogos } from "@/components/company-logos";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import dynamic from "next/dynamic";

// Dynamically import components to avoid SSR issues
const LaunchPad = dynamic(() => import("../components/launchpad/launchpad"), { ssr: false });
const ParticleBackground = dynamic(() => import("../components/particle-background"), { ssr: false });

export default function Home() {
  const words = useMemo(() => ["cofounder.", "investor.", "hire."], []);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Speed settings for the typing effect
  const typingSpeed = 150; // milliseconds per character when typing
  const deletingSpeed = 100; // milliseconds per character when deleting
  const delayAfterWord = 1000; // pause after word is fully typed

  // Handle LaunchPad search submission
  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    setShowResults(true);
  };

  // Handle closing results overlay
  const closeResults = () => {
    setShowResults(false);
  };

  // Typing effect
  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let timeoutId: NodeJS.Timeout;

    const handleTyping = () => {
      if (!isDeleting && displayText === currentWord) {
        // Word is complete, wait before deleting
        timeoutId = setTimeout(() => setIsDeleting(true), delayAfterWord);
        return;
      }

      if (isDeleting && displayText === "") {
        // Word is fully deleted, move to next word
        setIsDeleting(false);
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        return;
      }

      // Set timeout for next character
      timeoutId = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentWord.substring(0, displayText.length - 1)
            : currentWord.substring(0, displayText.length + 1)
        );
      }, isDeleting ? deletingSpeed : typingSpeed);
    };

    handleTyping();
    return () => clearTimeout(timeoutId);
  }, [displayText, isDeleting, currentWordIndex, words]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar - No Background */}
      <Navbar className="absolute top-0 left-0 w-full bg-transparent z-50" />

      {/* Results Overlay */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            className="fixed inset-0 bg-white z-50 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="container mx-auto pt-24 pb-12 px-4">
              {/* Close Button */}
              <button
                onClick={closeResults}
                className="absolute top-6 right-6 text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>

              {/* Search Input */}
              <motion.div initial={{ y: 200 }} animate={{ y: 0 }} className="mb-8">
                <LaunchPad initialQuery={searchQuery} onSubmit={handleSearchSubmit} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section with Particle Background */}
      <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-indigo-100 to-white relative overflow-hidden">
        <ParticleBackground className="absolute inset-0 z-0" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-2xl mx-auto z-10"
        >
          <h1 className="text-5xl font-extrabold text-gray-800 leading-tight">
            Find your next{" "}
            <span className="inline-block relative">
              <span className="text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text">
                {displayText}
              </span>
              <span
                className="absolute right-0 top-0 h-full w-[2px] bg-indigo-600 animate-blink"
                style={{ display: isDeleting ? "none" : "block", animationDelay: "0.5s" }}
              ></span>
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Connect with over 500,000 investors, founders, and resources to grow your startup.
          </p>

          {/* LaunchPad Search Component */}
          <div className="mt-8 max-w-xl mx-auto">
            <LaunchPad onSubmit={handleSearchSubmit} />
          </div>
        </motion.div>
      </main>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <Stats />
      </section>
    </div>
  );
}
