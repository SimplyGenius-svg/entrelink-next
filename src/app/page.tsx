"use client";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { Search } from "@/components/search";
import { Stats } from "@/components/stats";
import { CompanyLogos } from "@/components/company-logos";
import { Button } from "@/components/ui/button";

export default function Home() {
  // Memoized words array to prevent unnecessary re-renders
  const words = useMemo(() => ["cofounder.", "investor.", "hire."], []);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [visibleWord, setVisibleWord] = useState(words[0]);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Trigger fade-out
      setIsFading(true);

      setTimeout(() => {
        // Update the word after fade-out
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setVisibleWord(words[(currentWordIndex + 1) % words.length]);
        setIsFading(false); // Trigger fade-in
      }, 500); // Fade-out duration
    }, 3000); // Word switch interval

    return () => clearInterval(interval); // Clean up interval
  }, [currentWordIndex, words]);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-100 via-gray-50 to-muted overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link href="/" className="text-2xl font-bold text-primary" aria-label="Entrelink Home">
            Entrelink
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {["Database", "Features", "Resources", "Pricing"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                aria-label={`Go to ${item}`}
              >
                {item}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login" aria-label="Log in">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/signup" aria-label="Sign up">Sign up free</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <section className="relative px-6 py-24 text-center md:py-36">
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-200 to-indigo-300 blur-3xl opacity-30" />
          <div className="container mx-auto max-w-5xl">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Find your next{" "}
              <span
                className={`relative inline-block transition-opacity duration-500 ${
                  isFading ? "opacity-0" : "opacity-100"
                }`}
              >
                <span className="text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text">
                  {visibleWord}
                </span>
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 leading-relaxed">
              Access our database of 500,000+ investors across venture capital,
              angel investors, and investment firms. Powered by Founders. Supercharged by AI.
            </p>
            <div className="mt-8">
              <Search />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-6 py-16 bg-gray-50">
          <div className="container mx-auto">
            <Stats />
          </div>
        </section>

        {/* Database Glimpse Section */}
        <section className="px-6 py-16 bg-gray-50 border-t">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 text-center">
              Explore Our Database
            </h2>
            <p className="mt-4 text-gray-600 text-center">
              A sneak peek into our powerful investor database. Sign up to
              unlock the full experience.
            </p>
            <div className="mt-8 bg-white shadow-md rounded-lg overflow-hidden">
              <table className="w-full table-auto text-left border-collapse">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">Name</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">Type</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">Industry</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "John Doe", type: "Angel Investor", industry: "Technology", location: "San Francisco, CA" },
                    { name: "Jane Smith", type: "Venture Capitalist", industry: "Healthcare", location: "New York, NY" },
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/signup"
                className="px-6 py-3 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 transition"
                aria-label="Sign up to explore more"
              >
                Sign Up to Explore More
              </Link>
            </div>
          </div>
        </section>

        {/* Logos Section */}
        <section className="px-6 py-16 border-t bg-gray-100">
          <div className="container mx-auto text-center">
            <h3 className="mb-8 text-lg font-semibold text-gray-600">
              Trusted by thousands of founders worldwide
            </h3>
            <CompanyLogos />
          </div>
        </section>
      </main>
    </div>
  );
}
