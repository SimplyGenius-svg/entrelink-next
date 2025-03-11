"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "@/components/search";
import { FaBook, FaDownload, FaVideo, FaGraduationCap } from "react-icons/fa";
import { Navbar } from "@/components/navbar";

export default function Resources() {
  const categories = ["All", "Articles", "Templates", "Videos", "Webinars"];
  const resources = [
    {
      title: "How to Create a Winning Pitch Deck",
      description: "A comprehensive guide to crafting a pitch deck that attracts investors.",
      category: "Articles",
      icon: <FaBook />, // Replaced placeholder image with icon
      type: "article",
    },
    {
      title: "Financial Projection Template",
      description: "A free downloadable Excel template for your financial projections.",
      category: "Templates",
      icon: <FaDownload />,
      type: "template",
    },
    {
      title: "Masterclass: Building a Startup from Scratch",
      description: "Join our expert-led webinar on the essentials of startup building.",
      category: "Webinars",
      icon: <FaGraduationCap />,
      type: "webinar",
    },
    {
      title: "5-Minute Guide to Finding Investors",
      description: "A quick video guide to identify and reach out to potential investors.",
      category: "Videos",
      icon: <FaVideo />,
      type: "video",
    },
    {
      title: "Investor Email Templates",
      description: "Pre-written email templates to pitch your startup to investors.",
      category: "Templates",
      icon: <FaDownload />,
      type: "template",
    },
  ];

  const [activeCategory, setActiveCategory] = useState("All");

  const filteredResources =
    activeCategory === "All"
      ? resources
      : resources.filter((resource) => resource.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-50 to-muted">
      {/* Replace custom header with Navbar component */}
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="px-6 py-20 text-center bg-gradient-to-r from-purple-100 via-indigo-50 to-purple-50">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
              Welcome to the Entrelink Resource Library
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Access free tools, templates, guides, and webinars designed to help you
              succeed in your entrepreneurial journey.
            </p>
            <div className="mt-8">
              <Search />
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="px-6 py-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="flex gap-4 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    activeCategory === category
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="px-6 py-16">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource, index) => (
                <div
                  key={index}
                  className="flex flex-col bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition-shadow"
                >
                  <div className="text-indigo-500 text-4xl mb-4 text-center">
                    {resource.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 text-center">
                    {resource.title}
                  </h3>
                  <p className="mt-4 text-sm text-gray-600 text-center">{resource.description}</p>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t">
                    <button className="text-sm font-medium text-indigo-500 hover:underline">
                      Learn More
                    </button>
                    {resource.type === "template" ? (
                      <button className="text-sm font-medium text-green-500 hover:underline">
                        Download
                      </button>
                    ) : (
                      <button className="text-sm font-medium text-indigo-500 hover:underline">
                        View
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
