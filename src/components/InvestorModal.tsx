import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import Image from "next/image";

interface Investor {
  id: string;
  name: string;
  industry: string;
  linkedin_url: string;
  match_score: number;
  photo_url: string;
  headline: string;
  match_explanation?: string[]; // Marked as optional to prevent undefined errors
}

interface InvestorModalProps {
  investor: Investor | null;
  onClose: () => void;
}

export default function InvestorModal({ investor, onClose }: InvestorModalProps) {
  if (!investor) return null;

  return (
    <motion.div
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
          <h2 className="text-xl font-bold text-black">{investor.name}</h2>
          <button onClick={onClose} aria-label="Close modal" className="text-gray-700 hover:text-black">
            <FiX size={24} />
          </button>
        </div>

        {/* Profile Image */}
        <div className="flex flex-col items-center mt-4">
          <Image 
            src={investor.photo_url} 
            alt={investor.name} 
            width={80} 
            height={80} 
            className="rounded-full object-cover"
          />
          <p className="text-gray-600 text-center mt-2">{investor.headline}</p>
          <p className="text-sm text-gray-500">{investor.industry}</p>
        </div>

        {/* Match Explanation */}
        {investor.match_explanation?.length ? (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-black">Match Explanation</h3>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              {investor.match_explanation.map((reason, idx) => (
                <li key={idx}>• {reason}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500 text-sm mt-4">No match explanation available.</p>
        )}

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          <a
            href={investor.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-4 py-2 rounded-lg font-medium hover:opacity-80 transition"
          >
            View LinkedIn
          </a>
          <button onClick={onClose} className="text-gray-700 hover:text-black">
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
