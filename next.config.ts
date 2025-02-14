import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  reactStrictMode: true,
  env: {
    APOLLO_API_KEY: process.env.APOLLO_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
};


export default nextConfig;
