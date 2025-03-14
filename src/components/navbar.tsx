"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface NavbarProps {
  className?: string; // Allow className as an optional prop
}

export function Navbar({ className = "" }: NavbarProps) {
  const pathname = usePathname(); // Keep and use pathname

  return (
    <header className={`sticky top-0 z-20 bg-transparent backdrop-blur-md shadow-md ${className}`}>
      <div className="container mx-auto flex items-center justify-between h-20 px-6">
        <Link href="/" className="flex items-center">
          <Image 
            src="/entrelink logo.png" 
            alt="EntreLink" 
            width={160}
            height={60}
            className="max-h-16"
            style={{ objectFit: "contain" }}
            priority
            onError={(e) => console.error("Image failed to load", e)}
          />
        </Link>
        <div className="flex space-x-4">
          <Link href="/login">
            <button className={`border border-indigo-600 px-4 py-2 rounded-md transition-colors 
              ${pathname === "/login" ? "bg-indigo-600 text-white" : "text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700"}`}>
              Log in
            </button>
          </Link>
          <Link href="/signup">
            <button className={`px-4 py-2 rounded-md transition-colors 
              ${pathname === "/signup" ? "bg-indigo-700 text-white" : "bg-indigo-600 text-white hover:bg-indigo-700"}`}>
              Sign up free
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
