"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

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
          {["Database", "Features", "Resources", "Pricing"].map((item) => {
            const href = `/${item.toLowerCase()}`;
            const isActive = pathname === href;
            
            return (
              <Link
                key={item}
                href={href}
                className={`text-sm font-medium transition relative ${
                  isActive 
                    ? "text-indigo-600" 
                    : "text-gray-700 hover:text-indigo-500"
                } ${
                  isActive 
                    ? "after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-0.5 after:bg-indigo-600" 
                    : ""
                }`}
              >
                {item}
              </Link>
            );
          })}
        </nav>
        <div className="flex space-x-4">
          <Button variant="ghost" className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors">
            <Link href="/login">Log in</Link>
          </Button>
          <Button className="bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
            <Link href="/signup">Sign up free</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}