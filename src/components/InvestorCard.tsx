import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

interface Investor {
  id: string;
  name: string;
  industry: string;
  linkedin_url: string;
  match_score: number;
  headline: string;
}

interface InvestorCardProps {
  investor: Investor;
  onSelect: () => void;
}

export default function InvestorCard({ investor, onSelect }: InvestorCardProps) {
  // Debug log kept for development purposes.
  console.log("Rendering Investor:", investor);

  // Handler to support keyboard interaction for accessibility.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect();
    }
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={onSelect}
      className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 flex items-center justify-between cursor-pointer hover:shadow-xl transition transform focus:outline-none focus:ring-2 focus:ring-gray-500"
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-black dark:text-white">
          {investor.name || "Unnamed Investor"}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {investor.industry || "Unknown Industry"}
        </p>
      </div>

      <div
        className={`text-xs font-semibold px-3 py-1 rounded-full ${
          investor.match_score > 80
            ? "bg-green-500"
            : investor.match_score > 60
            ? "bg-yellow-500"
            : "bg-red-500"
        } text-white`}
      >
        {investor.match_score}% Match
      </div>

      <a
        href={investor.linkedin_url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${investor.name}'s LinkedIn profile`}
        className="text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition ml-3"
      >
        <FiArrowUpRight size={18} />
      </a>
    </motion.div>
  );
}
