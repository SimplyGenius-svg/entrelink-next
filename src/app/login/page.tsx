"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { logIn } from "@/utils/auth"; // Your Firebase log-in function

export default function Login() {
  const [email, setEmail] = useState<string>(""); // Type as string
  const [password, setPassword] = useState<string>(""); // Type as string
  const [loading, setLoading] = useState<boolean>(false); // Type as boolean
  const [error, setError] = useState<string | null>(null); // Allow string or null

  const router = useRouter(); // Initialize router

  // Define event type as FormEvent
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const user = await logIn(email, password); // Log in with Firebase
      console.log("User logged in:", user);

      // Redirect to the dashboard after successful login
      router.push("/launchpad");
    } catch (error) {
      setError("Invalid email or password. Please try again."); // Set error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 overflow-hidden">
      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Log In</h2>
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          {/* Email Input */}
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
          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>
          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}
