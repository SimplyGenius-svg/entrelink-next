"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import {
  FaDatabase,
  FaBrain,
  FaFilePowerpoint,
  FaChartBar,
  FaComments,
  FaBook,
} from "react-icons/fa";

export default function Features() {
  const features = [
    {
      title: "Comprehensive Investor Database",
      description:
        "Access a curated list of over 500,000+ investors, including venture capitalists, angel investors, and investment firms. Filter by industry, location, and investment stage to find the perfect match.",
      icon: <FaDatabase />,
    },
    {
      title: "AI-Powered Matchmaking",
      description:
        "Leverage advanced AI algorithms to get matched with investors tailored to your needs, saving you time and increasing the likelihood of success.",
      icon: <FaBrain />,
    },
    {
      title: "Pitch Deck Builder",
      description:
        "Create stunning pitch decks with our intuitive builder. Customize templates, integrate financial projections, and share directly with investors.",
      icon: <FaFilePowerpoint />,
    },
    {
      title: "Real-Time Analytics",
      description:
        "Track investor engagement with your profile, pitch deck views, and communication metrics. Make informed decisions based on real-time data.",
      icon: <FaChartBar />,
    },
    {
      title: "Secure Communication Hub",
      description:
        "Chat directly with investors through a secure, centralized messaging platform. Keep all your conversations in one place.",
      icon: <FaComments />,
    },
    {
      title: "Educational Resources",
      description:
        "Access a library of resources, including articles, webinars, and templates, to enhance your fundraising skills and strategy.",
      icon: <FaBook />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-50 to-muted">
      {/* Replace custom header with Navbar component */}
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="px-6 py-20 text-center bg-gradient-to-r from-indigo-100 via-purple-100 to-indigo-50">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
              Discover the Features That Empower Founders
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              From finding the perfect investor to crafting a winning pitch
              deck, Entrelink provides all the tools you need to succeed.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-16">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center bg-white p-6 shadow-md rounded-lg hover:shadow-xl transition-shadow"
                >
                  <div className="text-indigo-500 text-4xl mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="mt-4 text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-16 text-center bg-gray-100">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-extrabold text-gray-800">
              Ready to Transform Your Fundraising Journey?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Join thousands of founders already using Entrelink to connect
              with investors and scale their businesses.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="/signup">Get Started for Free</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
