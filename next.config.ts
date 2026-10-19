import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // lib/events.ts reads data/events/*.json from disk at request time.
  outputFileTracingIncludes: {
    "/**": ["./data/events/**/*.json"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
};

export default nextConfig;
