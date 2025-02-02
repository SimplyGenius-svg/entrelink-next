"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { sidebarItems } from "@/lib/constants/sidebar";

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-64 bg-white shadow-md"
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold text-blue-600">EntreLink</h2>
      </div>
      <nav className="mt-6">
        {sidebarItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.label}
          </Link>
        ))}
      </nav>
    </motion.aside>
  );
}
