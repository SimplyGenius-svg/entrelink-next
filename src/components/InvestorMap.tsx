import { useState } from "react";
import { motion } from "framer-motion";
import { Button, Input } from "@/components/ui/button";
import { Upload, Send } from "lucide-react";

export default function PitchDeckUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [query, setQuery] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setSuccess(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }
    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append("pitchDeck", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload pitch deck.");
      }

      setSuccess("Pitch deck uploaded successfully!");
      setFile(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black p-6">
      <h1 className="text-4xl font-bold text-center mb-4">
        <span className="text-blue-600">Your AI Fundraising </span>
        <span className="text-purple-600">Concierge</span>
      </h1>
      <p className="text-gray-600 text-lg text-center mb-8">
        Drop your pitch deck or tell me what you're building—I'll find the right investors
      </p>
      
      <div className="bg-gray-100 p-6 rounded-xl shadow-md w-full max-w-2xl text-center">
        <Upload className="mx-auto text-gray-500 mb-4" size={40} />
        <p className="text-lg font-semibold mb-2">Drop your pitch deck or tell me what you're building</p>
        <p className="text-gray-500 mb-4">I'll analyze your startup and find the perfect investors for you</p>
        
        <input 
          type="file" 
          accept=".pdf,.ppt,.pptx" 
          onChange={handleFileChange} 
          className="hidden" 
          id="fileUpload"
        />
        <label htmlFor="fileUpload" className="bg-blue-600 px-6 py-3 text-lg flex items-center justify-center gap-2 mb-4 cursor-pointer text-white rounded-lg">
          <Upload /> {uploading ? "Uploading..." : "Upload Pitch Deck"}
        </label>
        
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden mt-4">
          <input
            type="text"
            placeholder="Tell me about your startup..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="p-3 text-lg w-full outline-none"
          />
          <Button className="bg-black px-4 py-3 text-lg flex items-center gap-2 text-white">
            <Send /> Send
          </Button>
        </div>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-400 mt-4">{success}</p>}
    </div>
  );
}
