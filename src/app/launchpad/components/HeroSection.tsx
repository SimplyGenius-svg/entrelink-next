"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-blue-600 rounded-lg shadow-lg p-6 mb-6 text-white"
    >
      <h2 className="text-3xl font-bold mb-2">Welcome back, Founder!</h2>
      <p className="text-xl mb-4">Here’s your startup journey at a glance:</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p className="text-sm uppercase">Pitch Deck Score</p>
          <p className="text-3xl font-bold">85%</p>
        </div>
        <div>
          <p className="text-sm uppercase">Investor Matches</p>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div>
          <p className="text-sm uppercase">Network Growth</p>
          <p className="text-3xl font-bold">+23%</p>
        </div>
      </div>
    </motion.div>
  );
}
