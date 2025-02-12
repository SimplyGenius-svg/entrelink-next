"use client";

import { usePathname } from "next/navigation"; // For active link detection
import Link from "next/link";
import { motion } from "framer-motion";
import { sidebarItems } from "@/lib/constants/sidebar";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // For collapsible icon toggle

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white shadow-md ${isCollapsed ? "w-20" : "w-64"} h-screen`}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between p-4">
        <h2 className={`text-2xl font-bold text-blue-600 ${isCollapsed ? "hidden" : ""}`}>
          EntreLink
        </h2>
        {/* Toggle Button for Collapsibility */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-600 hover:text-blue-600 focus:outline-none"
        >
          {isCollapsed ? <Menu className="h-6 w-6" /> : <X className="h-6 w-6" />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="mt-6">
        {sidebarItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 ${
              pathname === item.href ? "bg-blue-500 text-white" : ""
            }`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            <span className={`${isCollapsed ? "hidden" : ""}`}>{item.label}</span>
          </Link>
        ))}
      </nav>
    </motion.aside>
  );
}
