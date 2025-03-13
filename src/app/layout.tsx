import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

/* Load Custom Fonts */
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900", // Define full weight range for Geist Sans
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900", // Define full weight range for Geist Mono
});

/* Metadata for the App */
export const metadata: Metadata = {
  title: "EntreLink",
  description: "Connecting founders, investors, and opportunities seamlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="./fonts/GeistVF.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="./fonts/GeistMonoVF.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        {/* Override potential globals.css issues */}
        <style>{`
          body {
            background-color: rgb(255, 255, 255) !important;
            color: rgb(0, 0, 0) !important;
          }
        `}</style>
      </head>
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          antialiased
        `}
        style={{
          fontFamily: "var(--font-geist-sans, Arial, sans-serif)",
          backgroundColor: "rgb(255,255,255)",
          color: "rgb(0,0,0)",
        }}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
