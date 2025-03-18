"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { logIn } from "@/utils/auth"; // Ensure the logIn function is correctly implemented
import { FirebaseError } from "firebase/app";
import Link from "next/link"; // Use Next.js' Link component for client-side routing
import { gsap } from "gsap";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // GSAP animation for the right-side text
  useEffect(() => {
    gsap.fromTo(
      ".welcome-text",
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" }
    );
    gsap.fromTo(
      ".form-container",
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1.2, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await logIn(email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen">
      {/* Left Side (Login Card) */}
      <div className="w-1/3 bg-white flex items-center justify-center p-8 shadow-lg form-container">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-bold text-gray-800">Log In</h2>
          <p className="text-sm text-gray-600 mt-2">
            Enter your details to access your EntreLink launchpad.
          </p>
          <form onSubmit={handleLogin} className="mt-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your password"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Log In"}
            </button>
          </form>
          <p className="mt-6 text-sm text-gray-600 text-center">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-teal-600 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side (Welcome Section) */}
      <div className="w-2/3 bg-gradient-to-r from-blue-600 via-teal-500 to-blue-400 flex items-center justify-center p-12 relative">
        <div className="max-w-lg welcome-text">
          <h1 className="text-5xl font-extrabold leading-tight text-black">
            Welcome Back to <span className="text-black">EntreLink</span>
          </h1>
          <p className="mt-4 text-lg text-black opacity-90">
            Where ideas connect, opportunities grow, and entrepreneurs thrive. Let’s build something amazing together.
          </p>
        </div>
      </div>

      <style jsx>{`
        .welcome-text h1,
        .welcome-text span {
          color: #000000;
        }

        .bg-gradient-to-r {
          background: linear-gradient(
            135deg,
            #1d4ed8, /* Blue */
            #38b2ac, /* Teal */
            #3b82f6  /* Sky Blue */
          );
        }
      `}</style>
    </div>
  );
}
