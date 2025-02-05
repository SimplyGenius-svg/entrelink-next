"use client";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "@/components/search";
import { Stats } from "@/components/stats";
import { CompanyLogos } from "@/components/company-logos";
import { Button } from "@/components/ui/button";
import { FiUpload, FiSearch, FiUsers, FiTwitter, FiFacebook, FiLinkedin } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi";

export default function Home() {
  // Animated words (kept same text content)
  const words = useMemo(() => ["cofounder.", "investor.", "hire."], []);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [visibleWord, setVisibleWord] = useState(words[0]);
  const [isFading, setIsFading] = useState(false);

  // (Change 3 & 20) Mobile navigation state with slide-in animation
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // (Change 25) Modal state for interactive table row details
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // (Change 19) Scroll-to-top button visibility state
  const [showScroll, setShowScroll] = useState(false);

  // (Change 6) Animated word interval with fade and scale effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        const nextIndex = (currentWordIndex + 1) % words.length;
        setCurrentWordIndex(nextIndex);
        setVisibleWord(words[nextIndex]);
        setIsFading(false);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentWordIndex, words]);

  // (Change 19) Show "scroll-to-top" button after scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // (Change 25) Handler for modal open from table details click
  const handleOpenModal = (entry) => {
    setModalContent(entry);
    setModalOpen(true);
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* 
        Change 1: Header with glass-effect background
        Change 2: Sticky and elevated header
      */}
      <header className="sticky top-0 z-50 bg-white bg-opacity-70 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto flex items-center justify-between h-16 px-6">
          <div className="flex items-center space-x-2">
            <Link href="/" className="text-2xl font-bold text-gray-800 relative">
              EntreLink
              {/* Change 23: New notification badge */}
              <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs px-1 rounded-full">
                New
              </span>
            </Link>
          </div>
          {/* 
            Change 4: Desktop Navigation with animated underline on hover 
          */}
          <nav className="hidden md:flex space-x-6">
            {["Database", "Features", "Resources", "Pricing"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-sm font-medium text-gray-700 hover:text-indigo-500 transition relative"
              >
                {item}
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5 bg-indigo-500"
                  layoutId={`underline-${item}`}
                />
              </Link>
            ))}
          </nav>
          {/* Change 5: Desktop buttons remain */}
          <div className="hidden md:flex space-x-4">
            <Button variant="ghost">
              <Link href="/login">Log in</Link>
            </Button>
            <Button>
              <Link href="/signup">Sign up free</Link>
            </Button>
          </div>
          {/* Change 7: Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMobileNavOpen(!mobileNavOpen)} className="text-gray-800 focus:outline-none">
              {mobileNavOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>
        {/* Change 7 & 20: Mobile Navigation Menu with slide-down/up animation */}
        <AnimatePresence>
          {mobileNavOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white bg-opacity-90 backdrop-blur-sm border-t"
            >
              <ul className="flex flex-col space-y-2 p-4">
                {["Database", "Features", "Resources", "Pricing"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="block text-sm font-medium text-gray-700 hover:text-indigo-500 transition"
                      onClick={() => setMobileNavOpen(false)}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/login"
                    className="block text-sm font-medium text-gray-700 hover:text-indigo-500 transition"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    Log in
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="block text-sm font-medium text-indigo-500 hover:text-indigo-600 transition"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    Sign up free
                  </Link>
                </li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* 
        Change 8: Hero Section with a background image, parallax effect & gradient overlay 
        Change 9: Enhanced hero text animations 
        Change 10: Search component container with a drop shadow 
      */}
      <main
        className="relative flex flex-col items-center text-center px-6 py-24 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-100 to-white opacity-90"></div>
        <motion.div
          className="relative z-10 max-w-2xl"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            Find your next{" "}
            <span
              className={`inline-block transition-all duration-500 transform ${
                isFading ? "opacity-0 scale-75" : "opacity-100 scale-100"
              }`}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                {visibleWord}
              </span>
            </span>
          </motion.h1>
          <p className="mt-6 text-lg text-gray-600">
            Connect with over 500,000 investors, founders, and resources to grow your startup. Powered by AI. Designed for Founders.
          </p>
          <div className="mt-8 shadow-lg rounded-full inline-block">
            <Search />
          </div>
        </motion.div>
      </main>

      {/* 
        Change 11: "How It Works" Section with updated icons and card hover effects 
        Change 12: Cards now have a gradient border on hover and a slight scale transform 
      */}
      <section className="py-16 bg-gradient-to-r from-sky-50 to-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <FiUpload className="w-12 h-12 text-indigo-500" />,
                title: "Upload Your Pitch",
                description: "Share your vision through your pitch deck",
              },
              {
                icon: <FiSearch className="w-12 h-12 text-indigo-500" />,
                title: "AI Matching",
                description: "Our AI analyzes and matches you with relevant investors",
              },
              {
                icon: <FiUsers className="w-12 h-12 text-indigo-500" />,
                title: "Connect",
                description: "Start meaningful conversations with interested investors",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white rounded-lg shadow-lg border border-transparent hover:border-gradient-to-r hover:from-indigo-500 hover:to-purple-500 transition"
              >
                <div className="mb-4 flex justify-center">{step.icon}</div>
                <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                <p className="mt-2 text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        Change 13: Stats Section with enhanced scale animation 
      */}
      <section className="py-16 bg-white">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
          <Stats />
        </motion.div>
      </section>

      {/* 
        Change 14: Database Preview with interactive table rows, hover effects, and tooltips 
        Change 15: "Sign Up to Explore More" button gets a subtle scale effect on hover 
      */}
      <section className="py-16 bg-gradient-to-r from-sky-50 to-white border-t">
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
                  <motion.tr
                    key={index}
                    whileHover={{ scale: 1.02, backgroundColor: "#f0f9ff" }}
                    className={`border-b cursor-pointer ${index % 2 === 0 ? "bg-gray-50" : ""}`}
                    title="Click for more details"
                  >
                    <td className="px-6 py-4 text-sm text-gray-800">{entry.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{entry.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{entry.industry}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{entry.location}</td>
                    <td
                      className="px-6 py-4 text-sm text-indigo-500 hover:underline"
                      onClick={() => handleOpenModal(entry)}
                    >
                      Details
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8">
            <Link
              href="/signup"
              className="px-6 py-3 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 transition transform hover:scale-105 inline-block"
            >
              Sign Up to Explore More
            </Link>
          </div>
        </div>
      </section>

      {/* 
        Change 25: Modal for table details 
      */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              className="bg-white rounded-lg p-6 max-w-md mx-auto"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">{modalContent?.name}</h3>
              <p className="text-gray-600 mb-2">
                <strong>Type:</strong> {modalContent?.type}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Industry:</strong> {modalContent?.industry}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Location:</strong> {modalContent?.location}
              </p>
              <Button onClick={() => setModalOpen(false)}>Close</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 
        Change 16: Trusted Logos Section now fades in 
      */}
      <section className="py-16 bg-white">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <div className="container mx-auto text-center">
            <h3 className="text-lg font-semibold text-gray-600 mb-4">
              Trusted by thousands of founders worldwide
            </h3>
            <CompanyLogos />
          </div>
        </motion.div>
      </section>

      {/* 
        Change 17: Footer revamped with gradient background, extra links, and social icons 
        Change 18: Footer subscription input/button get extra focus and hover animations 
      */}
      <footer className="py-12 bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">EntreLink</h4>
            <p>We empower founders to connect with the right resources and scale their startups.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Explore</h4>
            <ul className="space-y-2">
              {["Database", "Features", "Pricing", "Resources"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="hover:text-indigo-500 transition">
                    {item}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/about" className="hover:text-indigo-500 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-indigo-500 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Subscribe</h4>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition transform hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <Link href="https://twitter.com" target="_blank" className="hover:text-indigo-400 transition">
                <FiTwitter size={24} />
              </Link>
              <Link href="https://facebook.com" target="_blank" className="hover:text-indigo-400 transition">
                <FiFacebook size={24} />
              </Link>
              <Link href="https://linkedin.com" target="_blank" className="hover:text-indigo-400 transition">
                <FiLinkedin size={24} />
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* 
        Change 19: Scroll-to-Top Button with smooth animation 
      */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            className="fixed bottom-8 right-8 bg-indigo-500 text-white p-3 rounded-full shadow-lg focus:outline-none"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
