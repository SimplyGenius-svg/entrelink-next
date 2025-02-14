import { motion } from "framer-motion";

export default function Message({ text, sender }: { text: string; sender: "user" | "bot" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${sender === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-xs p-3 rounded-lg ${
          sender === "user" ? "bg-blue-500 text-white" : "bg-gray-700 text-white"
        }`}
      >
        {text}
      </div>
    </motion.div>
  );
}
