import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
import EmailSidebar from "@/components/EmailSidebar";

interface Investor {
  id: string;
  name: string;
  company?: string;
  industry: string;
  location?: string;
  linkedin_url: string;
  email?: string;
  match_score: number;
  photo_url?: string;
  headline: string;
  match_explanation?: string[];
}

interface InvestorModalProps {
  investor: Investor | null;
  onClose: () => void;
  onOpenSidebar: (investor: Investor) => void;
}

export default function InvestorModal({ investor, onClose, onOpenSidebar }: InvestorModalProps) {
  if (!investor) return null;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleGenerateEmail = () => {
    onClose();
    onOpenSidebar(investor);
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="investor-modal-title"
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        exit={{ y: 50 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 id="investor-modal-title" className="text-xl font-bold text-black">
            {investor.name}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-gray-700 hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-500 rounded"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Investor Details */}
        <div className="mt-4 text-center">
          {investor.photo_url && (
            <img
              src={investor.photo_url}
              alt={`${investor.name}'s profile`}
              className="w-20 h-20 mx-auto rounded-full object-cover mb-3"
            />
          )}
          <p className="text-gray-600 text-sm">{investor.company || "Unknown Company"}</p>
          <p className="text-gray-600 text-sm">{investor.industry}</p>
          <p className="text-gray-500 text-xs">{investor.location || "Location not available"}</p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-3">
          <a
            href={investor.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View LinkedIn profile"
            className="flex-1 bg-black text-white px-4 py-2 rounded-lg font-medium text-center hover:opacity-80 transition"
          >
            View LinkedIn
          </a>
          <button
            onClick={handleGenerateEmail}
            className="flex-1 bg-black text-white px-4 py-2 rounded-lg font-medium text-center hover:opacity-80 transition"
          >
            Generate Email
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}