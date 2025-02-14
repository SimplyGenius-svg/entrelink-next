"use client";
import { useState } from "react";
import Message from "./Message";
import InputBox from "./InputBox";

export default function Chat() {
  const [messages, setMessages] = useState([
    { text: "Describe your startup in 140 characters, and we'll find investors.", sender: "bot" }
  ]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const newMessages = [...messages, { text, sender: "user" }];
    setMessages(newMessages);

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "🔍 Searching for investors...", sender: "bot" },
      ]);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { text: "✅ Found 3 investors! (Fetching data...)", sender: "bot" },
        ]);
      }, 2000);
    }, 1000);
  };

  return (
    <div className="mt-8 w-full max-w-xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <div className="h-60 overflow-y-auto space-y-2 p-2 border border-gray-300 rounded-lg">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.sender} />
        ))}
      </div>
      <InputBox sendMessage={sendMessage} />
    </div>
  );
}
