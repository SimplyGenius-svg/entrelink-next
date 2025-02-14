"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { gsap } from "gsap";

export default function Background() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({
        x: event.clientX / window.innerWidth - 0.5,
        y: event.clientY / window.innerHeight - 0.5,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    gsap.to(".background-waves", {
      x: mousePos.x * 30,
      y: mousePos.y * 30,
      ease: "power2.out",
      duration: 0.5,
    });
  }, [mousePos]);

  return (
    <motion.div
      className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-100 to-purple-200 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Fluid Background Waves */}
      <motion.div
        className="absolute inset-0 background-waves opacity-30"
        animate={{
          scale: [1, 1.02, 1],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.2) 20%, rgba(255,255,255,0) 80%)",
          filter: "blur(80px)",
        }}
      />
    </motion.div>
  );
}
