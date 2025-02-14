import type { NextConfig } from "next";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["media.licdn.com", "static.licdn.com"], // Allow LinkedIn profile images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.licdn.com",
      },
    ],
  },
  env: {
    APOLLO_API_KEY: process.env.APOLLO_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
};

export default nextConfig;
