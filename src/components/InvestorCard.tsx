import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import Image from "next/image";

interface Investor {
  id: string;
  name: string;
  industry: string;
  linkedin_url: string;
  match_score: number;
  photo_url: string;
  headline: string;
}

interface InvestorCardProps {
  investor: Investor;
  onSelect: () => void;
}

export default function InvestorCard({ investor, onSelect }: InvestorCardProps) {
  return (
    <motion.div
      className="relative bg-white rounded-xl shadow-lg p-4 flex items-center space-x-4 cursor-pointer hover:shadow-xl transition"
      whileHover={{ scale: 1.05 }}
      onClick={onSelect}
    >
      <Image 
        src={investor.photo_url} 
        alt={investor.name} 
        width={56} 
        height={56} 
        className="rounded-full object-cover"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-black">{investor.name}</h3>
        <p className="text-gray-600 text-sm">{investor.industry}</p>
      </div>
      <div className={`text-xs font-semibold px-3 py-1 rounded-full ${
        investor.match_score > 80 ? "bg-green-500" : investor.match_score > 60 ? "bg-yellow-500" : "bg-red-500"
      } text-white`}>
        {investor.match_score}% Match
      </div>
      <a href={investor.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-black">
        <FiArrowUpRight size={18} />
      </a>
    </motion.div>
  );
}
