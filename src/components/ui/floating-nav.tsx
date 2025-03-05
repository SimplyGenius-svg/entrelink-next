"use client";

import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const FloatingNav = ({ navItems }: { navItems: { name: string; link: string }[] }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-lg border border-white/20 px-6 py-3 rounded-full shadow-lg flex items-center gap-6 text-white">
      {navItems.map((item) => (
        <a key={item.name} href={item.link} className="hover:text-blue-400 transition">
          {item.name}
        </a>
      ))}
      <button className="md:hidden" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
        {mobileNavOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>
    </nav>
  );
};

export {FloatingNav};
