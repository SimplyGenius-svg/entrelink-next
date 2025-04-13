"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/utils/auth";
import { FirebaseError } from "firebase/app";
import Link from "next/link"; // Use Next.js' Link component for navigation
import { gsap } from "gsap";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // GSAP animation for the right-side text and back arrow
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
    gsap.fromTo(
      ".back-arrow",
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signUp(email, password);
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
      {/* Left Side (Sign Up Card) */}
      <div className="w-1/3 bg-white flex items-center justify-center p-8 shadow-lg form-container relative">
        {/* Back Arrow */}
        <button 
          onClick={() => router.push('/')} 
          className="absolute top-3 left-3 flex items-center space-x-1 text-gray-600 hover:text-indigo-600 transition-colors back-arrow"
          aria-label="Go back to home"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-bold text-gray-800">Sign Up</h2>
          <p className="text-sm text-gray-600 mt-2">
            Create your account and start your EntreLink journey.
          </p>
          <form onSubmit={handleSignup} className="mt-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Create a password"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          <p className="mt-6 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 font-semibold hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side (Welcome Section) */}
      <div className="w-2/3 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 flex items-center justify-center p-12 relative">
        <div className="max-w-lg welcome-text">
          <h1 className="text-5xl font-extrabold leading-tight text-black">
            Join <span className="text-black">EntreLink</span>
          </h1>
          <p className="mt-4 text-lg text-black opacity-90">
            Connect with innovators, investors, and opportunities to turn your vision into reality.
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
            #6366f1, /* Indigo */
            #8b5cf6, /* Purple */
            #3b82f6  /* Blue */
          );
        }
      `}</style>
    </div>
  );
}
