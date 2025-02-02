"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { logIn } from "@/utils/auth"; // Ensure the logIn function is correctly implemented
import { FirebaseError } from "firebase/app";
import Link from "next/link"; // Use Next.js' Link component for client-side routing

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await logIn(email, password);
      router.push("/launchpad");
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
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-green-500 via-teal-500 to-blue-500 overflow-hidden">
      <div className="relative z-10 w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Log In</h2>
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
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
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600 text-center">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-teal-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
