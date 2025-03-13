import { motion } from "framer-motion";
import { FiX, FiSend } from "react-icons/fi";
import { useState } from "react";
import { db, collection, addDoc, serverTimestamp } from "@/firebase";

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
  const [subject, setSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  // Generate email using OpenAI API
  const handleGenerateEmail = async () => {
    if (!subject.trim()) return;
    setLoading(true);
    try {
      const response = await fetch("/api/generate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject }),
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

  // Store email request in Firebase
  const handleRequestToSend = async () => {
    if (!subject.trim() || !emailBody.trim()) return alert("Please enter a subject and email body.");

    try {
      await addDoc(collection(db, "emailRequests"), {
        investorId: investor.id,
        investorName: investor.name,
        investorEmail: investor.email || "Not provided",
        subject,
        emailBody,
        timestamp: serverTimestamp(),
      });

      setRequestSent(true);
    } catch (error) {
      console.error("Error saving email request:", error);
      alert("Failed to save email request.");
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

      {/* Email Subject */}
      <input
        type="text"
        placeholder="Enter subject here..."
        className="w-full p-2 border rounded mb-3"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      {/* Email Body */}
      <textarea
        placeholder="Write your message here..."
        className="w-full h-52 p-3 border rounded resize-none text-sm"
        value={emailBody}
        onChange={(e) => setEmailBody(e.target.value)}
      />

      {/* Action Buttons */}
      <div className="mt-4 flex flex-col gap-3">
        {/* Generate Email Button */}
        <button
          onClick={handleGenerateEmail}
          className="w-full bg-black text-white px-4 py-2 rounded-lg font-medium hover:opacity-80 transition"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Email"}
        </button>

        {/* Request to Send Button */}
        <button
          onClick={handleRequestToSend}
          className="w-full bg-black text-white px-4 py-2 rounded-lg font-medium hover:opacity-80 transition"
          disabled={requestSent}
        >
          {requestSent ? "Request Sent ✅" : "Request to Send"}
        </button>
      </div>
    </motion.div>
  );
}
