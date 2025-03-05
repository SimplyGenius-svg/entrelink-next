import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useEffect } from "react";

interface Investor {
  id: string;
  name: string;
  industry: string;
  linkedin_url: string;
  match_score: number;
  headline: string;
  match_explanation?: string[];
}

interface InvestorModalProps {
  investor: Investor | null;
  onClose: () => void;
}

export default function InvestorModal({ investor, onClose }: InvestorModalProps) {
  if (!investor) return null;

  // Close modal on Escape key press.
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

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
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-lg"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        exit={{ y: 50 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 id="investor-modal-title" className="text-xl font-bold text-black dark:text-white">
            {investor.name}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 rounded"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Investor Details */}
        <div className="mt-4">
          <p className="text-gray-600 dark:text-gray-300 text-center">{investor.headline}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">{investor.industry}</p>
        </div>

        {/* Match Explanation */}
        {investor.match_explanation?.length ? (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-black dark:text-white">Match Explanation</h3>
            <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-300">
              {investor.match_explanation.map((reason, idx) => (
                <li key={idx}>• {reason}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">No match explanation available.</p>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-3">
          <a
            href={investor.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View LinkedIn profile"
            className="flex-1 bg-black dark:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium text-center hover:opacity-80 transition"
          >
            View LinkedIn
          </a>
          <button
            onClick={onClose}
            className="flex-1 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 transition"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
