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
    <div className="mt-6 flex items-center border border-gray-300 rounded-xl">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={140}
        placeholder="Describe your startup..."
        className="flex-1 bg-transparent outline-none text-gray-700 p-4 h-20 resize-none rounded-l-xl"
      />
      <button
        onClick={handleSend}
        className="p-4 h-20 rounded-r-xl bg-blue-500 hover:bg-blue-600 flex items-center justify-center"
      >
        <Send className="h-6 w-6 text-white" />
      </button>
    </div>
  );
}
