import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF (smallest) then WebP — ~30-50% smaller than PNG/JPEG
    formats: ["image/avif", "image/webp"],
    // Cache optimised images for 30 days (default is 60s in dev)
    minimumCacheTTL: 2592000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
