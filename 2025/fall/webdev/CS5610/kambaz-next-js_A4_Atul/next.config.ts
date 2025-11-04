import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // This tells Vercel/Next.js to ignore ESLint warnings & errors during build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
