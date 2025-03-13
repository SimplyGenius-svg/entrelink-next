import { motion } from "framer-motion";
import { FiArrowUpRight, FiLinkedin, FiMail } from "react-icons/fi";
import { useState } from "react";
import InvestorModal from "@/components/InvestorModal";

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
}

interface InvestorCardProps {
  investor: Investor;
}

export default function InvestorCard({ investor }: InvestorCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpenModal();
    }
  };

  return (
    <>
      <motion.div
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onClick={handleOpenModal}
        className="relative bg-white rounded-xl shadow-lg p-3 flex items-center justify-between cursor-pointer hover:shadow-xl transition transform focus:outline-none focus:ring-2 focus:ring-gray-500 mb-6"
        whileHover={{ scale: 1.05 }}
      >
        {/* Profile Picture (Smaller Size) */}
        {investor.photo_url && (
          <img
            src={investor.photo_url}
            alt={`${investor.name}'s profile`}
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
        )}

        <div className="flex-1">
          <h3 className="text-md font-semibold text-black">{investor.name || "Unnamed Investor"}</h3>
          {investor.company && <p className="text-gray-600 text-xs font-medium">{investor.company}</p>}
          <p className="text-gray-600 text-xs">{investor.industry || "Unknown Industry"}</p>
          {investor.location && <p className="text-gray-500 text-xs">{investor.location}</p>}
        </div>

        {/* Match Score */}
        <div
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            investor.match_score > 80
              ? "bg-green-500"
              : investor.match_score > 60
              ? "bg-yellow-500"
              : "bg-red-500"
          } text-white`}
        >
          {investor.match_score}% Match
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 ml-3">
          {/* LinkedIn Button */}
          <a
            href={investor.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${investor.name}'s LinkedIn profile`}
            className="text-blue-600 hover:text-blue-800 transition"
          >
            <FiLinkedin size={18} />
          </a>

          {/* Email Button */}
          {investor.email && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleOpenModal();
              }}
              className="text-gray-800 hover:text-black transition"
              aria-label={`Send an email to ${investor.name}`}
            >
              <FiMail size={18} />
            </button>
          )}
        </div>
      </motion.div>

      {isModalOpen && <InvestorModal investor={investor} onClose={handleCloseModal} />}
    </>
  );
}