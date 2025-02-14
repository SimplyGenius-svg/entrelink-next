import { useState } from "react";
import { Send } from "lucide-react";

export default function InputBox({ sendMessage }: { sendMessage: (text: string) => void }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.length > 140) return;
    sendMessage(text);
    setText("");
  };

  return (
    <div className="mt-4 flex items-center border border-gray-300 rounded-lg">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={140}
        placeholder="Describe your startup..."
        className="flex-1 bg-transparent outline-none text-gray-700 p-2"
      />
      <button
        onClick={handleSend}
        className="p-2 rounded-r-lg bg-blue-500 hover:bg-blue-600"
      >
        <Send className="h-5 w-5 text-white" />
      </button>
    </div>
  );
}
