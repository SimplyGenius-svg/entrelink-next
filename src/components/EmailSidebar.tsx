import { motion } from "framer-motion";
import { FiX, FiSend } from "react-icons/fi";
import { useState } from "react";

interface Investor {
  id: string;
  name: string;
  email?: string;
  company?: string;
}

interface EmailSidebarProps {
  investor: Investor;
  onClose: () => void;
}

export default function EmailSidebar({ investor, onClose }: EmailSidebarProps) {
  const [emailBody, setEmailBody] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateEmail = async () => {
    if (!emailBody.trim()) return;
    setLoading(true);
    try {
      const response = await fetch("/api/generate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipient: investor.email, body: emailBody }),
      });
      const data = await response.json();
      setEmailBody(data.generatedEmail || "Failed to generate email.");
    } catch (error) {
      console.error("Error generating email:", error);
      setEmailBody("Error generating email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg z-50 p-6 flex flex-col"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-black">Compose Email</h2>
        <button onClick={onClose} className="text-gray-700 hover:text-black">
          <FiX size={24} />
        </button>
      </div>

      {/* Investor Info */}
      <p className="text-gray-600 text-sm mb-4">
        Sending to: <span className="font-semibold">{investor.name}</span> {investor.company ? `(${investor.company})` : ""}
      </p>

      {/* Email Input */}
      <textarea
        placeholder="Write your message here..."
        className="w-full h-40 p-2 border rounded resize-none"
        value={emailBody}
        onChange={(e) => setEmailBody(e.target.value)}
      />

      {/* Send Button */}
      <button
        onClick={handleGenerateEmail}
        className="mt-4 flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg font-medium hover:opacity-80 transition"
        disabled={loading}
      >
        {loading ? "Generating..." : (
          <>
            <FiSend className="mr-2" /> Send Email
          </>
        )}
      </button>
    </motion.div>
  );
}