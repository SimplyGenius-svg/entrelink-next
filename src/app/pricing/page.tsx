"use client";
import Link from "next/link";

export default function Pricing() {
  const plans = [
    {
      name: "Free Plan",
      price: "Free",
      features: [
        "Basic networking",
        "Profile creation",
      ],
      buttonText: "Get Started for Free",
      buttonLink: "/signup",
      popular: false,
    },
    {
      name: "Basic Plan",
      price: "$23/month or $230/year",
      features: [
        "Database-style search",
        "Apollo API",
        "Basic resources",
      ],
      buttonText: "Choose Basic Plan",
      buttonLink: "/signup",
      popular: false,
    },
    {
      name: "Platinum Plan",
      price: "$50/month or $500/year",
      features: [
        "Enhanced networking",
        "AI Chatbot",
        "Pitch deck feedback",
        "Accelerator calculator",
        "Premium resources",
        "Investor matchmaking",
      ],
      buttonText: "Choose Platinum Plan",
      buttonLink: "/signup",
      popular: true,
    },
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

      {/* Main Content */}
      <main className="py-20">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Choose the Right Plan for You
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Flexible plans tailored to meet the needs of every founder. Start for free or upgrade for exclusive features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="container mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col rounded-lg p-6 shadow-md bg-white hover:shadow-lg transition-shadow ${
                plan.popular ? "border-2 border-indigo-500" : ""
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 right-4 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                  Popular
                </span>
              )}
              <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
              <p className="mt-4 text-2xl font-extrabold text-gray-800">{plan.price}</p>
              <ul className="mt-6 space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full inline-block"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href={plan.buttonLink}
                  className={`px-4 py-2 w-full text-center block rounded-lg text-white font-medium ${
                    plan.popular ? "bg-indigo-500 hover:bg-indigo-600" : "bg-gray-700 hover:bg-gray-800"
                  }`}
                >
                  {plan.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
