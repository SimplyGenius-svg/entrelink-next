"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-md border-b">
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