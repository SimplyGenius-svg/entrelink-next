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
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Validate email format
  const isValidEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  // Generate email using OpenAI API
  const handleGenerateEmail = async () => {
    if (!subject.trim()) {
      setErrors({...errors, subject: "Subject is required for generating an email"});
      return;
    }
    
    setGenerating(true);
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
      setGenerating(false);
    }
  };

  // Validate all fields
  const validateFields = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!senderName.trim()) {
      newErrors.senderName = "Your name is required";
    }
    
    if (!senderEmail.trim()) {
      newErrors.senderEmail = "Your email is required";
    } else if (!isValidEmail(senderEmail)) {
      newErrors.senderEmail = "Please enter a valid email address";
    }
    
    if (!subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    
    if (!emailBody.trim()) {
      newErrors.emailBody = "Email body is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Store email request via API route
  const handleRequestToSend = async () => {
    if (!validateFields()) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/request-email-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderName,
          senderEmail,
          investorId: investor.id,
          investorName: investor.name,
          investorEmail: investor.email || "Not provided",
          investorCompany: investor.company || "Not provided",
          subject,
          emailBody
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send email request");
      }

      setRequestSent(true);
    } catch (error) {
      console.error("Error sending email request:", error);
      alert("Failed to send email request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg z-50 p-6 flex flex-col overflow-y-auto"
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

      {/* Sender Info Section */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Your Information</h3>
        
        {/* Sender Name */}
        <div className="mb-2">
          <input
            type="text"
            placeholder="Your Name *"
            className={`w-full p-2 border rounded ${errors.senderName ? 'border-red-500' : ''}`}
            value={senderName}
            onChange={(e) => {
              setSenderName(e.target.value);
              if (errors.senderName) {
                setErrors({...errors, senderName: ""});
              }
            }}
          />
          {errors.senderName && (
            <p className="text-red-500 text-xs mt-1">{errors.senderName}</p>
          )}
        </div>
        
        {/* Sender Email */}
        <div className="mb-2">
          <input
            type="email"
            placeholder="Your Email Address *"
            className={`w-full p-2 border rounded ${errors.senderEmail ? 'border-red-500' : ''}`}
            value={senderEmail}
            onChange={(e) => {
              setSenderEmail(e.target.value);
              if (errors.senderEmail) {
                setErrors({...errors, senderEmail: ""});
              }
            }}
          />
          {errors.senderEmail && (
            <p className="text-red-500 text-xs mt-1">{errors.senderEmail}</p>
          )}
        </div>
      </div>

      {/* Recipient Info */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Sending To</h3>
        <p className="text-gray-600 text-sm">
          <span className="font-semibold">{investor.name}</span> {investor.company ? `(${investor.company})` : ""}
        </p>
      </div>

      {/* Email Subject */}
      <div className="mb-2">
        <input
          type="text"
          placeholder="Enter subject here... *"
          className={`w-full p-2 border rounded ${errors.subject ? 'border-red-500' : ''}`}
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
            if (errors.subject) {
              setErrors({...errors, subject: ""});
            }
          }}
        />
        {errors.subject && (
          <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
        )}
      </div>

      {/* Email Body */}
      <div className="mb-2 flex-grow">
        <textarea
          placeholder="Write your message here... *"
          className={`w-full h-52 p-3 border rounded resize-none text-sm ${errors.emailBody ? 'border-red-500' : ''}`}
          value={emailBody}
          onChange={(e) => {
            setEmailBody(e.target.value);
            if (errors.emailBody) {
              setErrors({...errors, emailBody: ""});
            }
          }}
        />
        {errors.emailBody && (
          <p className="text-red-500 text-xs mt-1">{errors.emailBody}</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex flex-col gap-3">
        {/* Generate Email Button */}
        <button
          onClick={handleGenerateEmail}
          className="w-full bg-black text-white px-4 py-2 rounded-lg font-medium hover:opacity-80 transition"
          disabled={generating}
        >
          {generating ? "Generating..." : "Generate Email"}
        </button>

        {/* Request to Send Button */}
        <button
          onClick={handleRequestToSend}
          className={`w-full px-4 py-2 rounded-lg font-medium transition ${
            requestSent 
              ? "bg-green-500 text-white cursor-default" 
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
          disabled={loading || requestSent}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : requestSent ? (
            "Request Sent ✓"
          ) : (
            "Request to Send"
          )}
        </button>
      </div>
      
      {/* Note at bottom */}
      <p className="text-xs text-gray-500 mt-4">
        * Required fields. We'll review your request and connect you with {investor.name} if approved.
      </p>
    </motion.div>
  );
}
