/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        // Optional: restrict to specific paths
        // pathname: '/images/**',
      },
      // Add any other domains you need
    ],
  },
}

module.exports = nextConfig