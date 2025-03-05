"use client";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "@/components/search";
import { Stats } from "@/components/stats";
import { CompanyLogos } from "@/components/company-logos";
import { Button } from "@/components/ui/button";

export default function Home() {
  const words = useMemo(() => ["cofounder.", "investor.", "hire."], []);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [visibleWord, setVisibleWord] = useState(words[0]);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setVisibleWord(words[(currentWordIndex + 1) % words.length]);
        setIsFading(false);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentWordIndex, words]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-md border-b">
        <div className="container mx-auto flex items-center justify-between h-16 px-6">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            EntreLink
          </Link>
          <nav className="hidden md:flex space-x-6">
            {["Database", "Features", "Resources", "Pricing"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-sm font-medium text-gray-700 hover:text-indigo-500 transition"
              >
                {item}
              </Link>
            ))}
          </nav>
          <div className="flex space-x-4">
            <Button variant="ghost">
              <Link href="/login">Log in</Link>
            </Button>
            <Button>
              <Link href="/signup">Sign up free</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative flex flex-col items-center text-center px-6 py-24 bg-gradient-to-b from-indigo-100 to-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-extrabold text-gray-800 leading-tight">
            Find your next {" "}
            <span
              className={`inline-block transition-opacity duration-500 ${
                isFading ? "opacity-0" : "opacity-100"
              }`}
            >
              <span className="text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text">
                {visibleWord}
              </span>
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Connect with over 500,000 investors, founders, and resources to grow your startup. Powered by AI. Designed for Founders.
          </p>
          <div className="mt-8">
            <Search />
          </div>
        </motion.div>
      </main>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Stats />
        </motion.div>
      </section>

      {/* Database Preview */}
      <section className="py-16 bg-gray-50 border-t">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-extrabold text-gray-800">Explore Our Database</h2>
          <p className="mt-4 text-gray-600">
            Get a glimpse into our powerful investor database. Sign up to unlock full details.
          </p>
          <div className="mt-8 bg-white shadow-md rounded-lg overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">Name</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">Type</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">Industry</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">Location</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">Learn More</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "John Doe", type: "Angel Investor", industry: "Tech", location: "San Francisco, CA" },
                  { name: "Jane Smith", type: "VC", industry: "Healthcare", location: "New York, NY" },
                  { name: "Acme Capital", type: "Investment Firm", industry: "Finance", location: "Chicago, IL" },
                ].map((entry, index) => (
                  <tr
                    key={index}
                    className={`border-b ${index % 2 === 0 ? "bg-gray-50" : ""}`}
                  >
                    <td className="px-6 py-4 text-sm text-gray-800">{entry.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{entry.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{entry.industry}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{entry.location}</td>
                    <td className="px-6 py-4 text-sm text-indigo-500 hover:underline cursor-pointer">
                      <Link href={`/profile/${index}`}>Details</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8">
            <Link
              href="/signup"
              className="px-6 py-3 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 transition"
            >
              Sign Up to Explore More
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted Logos Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h3 className="text-lg font-semibold text-gray-600 mb-4">
            Trusted by thousands of founders worldwide
          </h3>
          <CompanyLogos />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-300">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">EntreLink</h4>
            <p>We empower founders to connect with the right resources and scale their startups.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Explore</h4>
            <ul className="space-y-2">
              {["Database", "Features", "Pricing", "Resources"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="hover:text-indigo-500 transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Subscribe</h4>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
}