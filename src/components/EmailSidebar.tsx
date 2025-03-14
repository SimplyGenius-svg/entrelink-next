import { motion } from "framer-motion";
import { FiX, FiSend } from "react-icons/fi";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface Investor {
  id: string;
  name: string;
  email?: string;
  company?: string;
  industry?: string;
  portfolio?: string[];
  investmentFocus?: string[];
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
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Validate email format
  const isValidEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  // Generate email using OpenAI API
  const handleGenerateEmail = async () => {
    // Check if sender name and subject are provided
    if (!senderName.trim()) {
      setErrors({...errors, senderName: "Your name is required to generate an email"});
      return;
    }
    
    if (!subject.trim()) {
      setErrors({...errors, subject: "Subject is required for generating an email"});
      return;
    }
    
    setGenerating(true);
    try {
      const response = await fetch("/api/generate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          senderName,
          investorDetails: {
            name: investor.name,
            company: investor.company || "",
            industry: investor.industry || "",
            portfolio: investor.portfolio || [],
            investmentFocus: investor.investmentFocus || [],
            // Add any other investor details you have available
          }
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to generate email");
      }
      
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
    
    if (!termsAccepted) {
      newErrors.terms = "You must agree to the Terms of Service";
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

  // Use a portal to render the sidebar directly to the document body
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    // Disable scrolling on the body when sidebar is open
    document.body.style.overflow = "hidden";
    
    return () => {
      // Re-enable scrolling when sidebar is closed
      document.body.style.overflow = "auto";
    };
  }, []);

  const sidebarContent = (
    <>
      {/* Overlay with increased z-index */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-[99999]" 
        onClick={onClose}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
      />
      
      {/* Sidebar content with increased z-index */}
      <motion.div
        className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg z-[100000] p-6 flex flex-col overflow-y-auto"
        style={{ position: 'fixed' }}
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
          <p className="text-xs text-gray-500 mb-3">
            Please enter your full name and personal email address where you wish to receive communications.
          </p>
          
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

        {/* Email Generation Info */}
        <div className="mb-3">
          <p className="text-xs text-gray-500">
            <span className="font-medium text-indigo-600">Time-saving tip:</span> Enter your name and a subject above, then click "Generate Email" to create an AI-drafted message personalized to this investor, or write your own message below.
          </p>
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

          {/* Review reminder */}
          {/* <div className="mt-3 mb-2">
            <p className="text-sm text-amber-600 font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Please review your email carefully before proceeding
            </p>
          </div> */}
          
          {/* Terms of Service Checkbox */}
          <div className="flex items-start mt-2 mb-3">
            <div className="flex h-5 items-center">
              <input
                id="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => {
                  setTermsAccepted(e.target.checked);
                  if (errors.terms) {
                    setErrors({...errors, terms: ""});
                  }
                }}
                className={`h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 ${
                  errors.terms ? 'border-red-500' : ''
                }`}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="text-gray-700">
                I agree to the <a href="/terms" target="_blank" className="text-indigo-600 hover:underline">Terms of Service</a> and <a href="/privacy" target="_blank" className="text-indigo-600 hover:underline">Privacy Policy</a>
              </label>
              {errors.terms && (
                <p className="text-red-500 text-xs mt-1">{errors.terms}</p>
              )}
            </div>
          </div>

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
    </>
  );

  // Use portal to render at document.body level
  return mounted ? createPortal(sidebarContent, document.body) : null;
}