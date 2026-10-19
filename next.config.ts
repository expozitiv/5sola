import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // lib/events.ts reads data/events/*.json from disk at request time.
  outputFileTracingIncludes: {
    "/**": ["./data/events/**/*.json"],
  },
  // Next.js doesn't serve index.html for a folder path; the CMS is public/admin/index.html.
  async rewrites() {
    return [{ source: "/admin", destination: "/admin/index.html" }];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
};

export default nextConfig;
