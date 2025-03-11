"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-md border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          EntreLink
        </Link>
        <nav className="hidden md:flex space-x-6">
          {["Database", "Features", "Resources", "Pricing"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-sm font-medium text-gray-700 hover:text-indigo-500 transition"
            >
              {item}
            </Link>
          ))}
        </nav>
        <div className="flex space-x-4">
          <Button variant="ghost">
            <Link href="/login">Log in</Link>
          </Button>
          <Button>
            <Link href="/signup">Sign up free</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}