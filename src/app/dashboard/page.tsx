"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { LoadingOverlay } from "@/components/ui/loading-animation";

const ParticleBackground = dynamic(() => import("@/components/particle-background"), { ssr: false });

export default function Dashboard() {
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (pageLoading) {
    return <LoadingOverlay bgColor="rgba(255, 255, 255, 1)" />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <main className="flex flex-col items-center justify-center min-h-screen text-center px-6 relative overflow-hidden">
        <ParticleBackground className="absolute inset-0 z-0" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 max-w-2xl mx-auto"
        >
          <h1 className="text-5xl font-extrabold leading-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            We’re glad you’re here.
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            We can’t wait for what’s next. Stay tuned for our next beta release to access more features. 🚀
          </p>
        </motion.div>
      </main>
    </div>
  );
}