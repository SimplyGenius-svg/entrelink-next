"use client";
import Link from "next/link";

export default function Database() {
  const sampleData = [
    { name: "John Doe", type: "Angel Investor", industry: "Technology", location: "San Francisco, CA" },
    { name: "Jane Smith", type: "Venture Capitalist", industry: "Healthcare", location: "New York, NY" },
    { name: "Acme Capital", type: "Investment Firm", industry: "Finance", location: "Chicago, IL" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-50 to-muted">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link href="/" className="text-2xl font-bold text-primary">
            Entrelink
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {["Database", "Features", "Resources", "Pricing"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 hover:text-primary"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition"
            >
              Sign up free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="px-6 py-20 text-center bg-gradient-to-r from-indigo-100 via-purple-50 to-indigo-50">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
              Discover Entrelink's Investor Database
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              A quick glimpse into our powerful database connecting founders with investors. 
              Get access to thousands of profiles across industries and regions.
            </p>
          </div>
        </section>

        {/* Database Glimpse */}
        <section className="px-6 py-16">
          <div className="container mx-auto max-w-6xl">
            {/* Search Bar Mockup */}
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search investors, firms, or industries..."
                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                disabled
              />
            </div>

            {/* Table Preview */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
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
                  {sampleData.map((entry, index) => (
                    <tr key={index} className={`border-b ${index % 2 === 0 ? "bg-gray-50" : ""}`}>
                      <td className="px-6 py-4 text-sm text-gray-800">{entry.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{entry.type}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{entry.industry}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{entry.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Call-to-Action */}
            <div className="mt-12 text-center">
              <h2 className="text-2xl font-bold text-gray-800">Want to Explore the Full Database?</h2>
              <p className="mt-4 text-gray-600">
                Unlock thousands of profiles and advanced search capabilities by signing up today.
              </p>
              <div className="mt-6">
                <Link
                  href="/signup"
                  className="px-6 py-3 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 transition"
                >
                  Sign Up for Free
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
