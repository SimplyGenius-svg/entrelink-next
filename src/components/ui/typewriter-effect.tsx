"use client";

import { useState, useEffect } from "react";

const TypewriterEffect = ({ words }: { words: string[] }) => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < words.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + words[index] + " ");
        setIndex(index + 1);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [index, words]);

  return <h1 className="text-5xl font-bold text-white mt-8">{text}|</h1>;
};

export {TypewriterEffect};
