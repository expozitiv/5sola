import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // lib/events.ts reads data/events/*.json from disk at request time.
  outputFileTracingIncludes: {
    "/**": ["./data/events/**/*.json"],
    // app/api/cms-config serves this file with per-deployment values.
    "/api/cms-config": ["./public/admin/config.yml"],
  },
  // Next.js doesn't serve index.html for a folder path; the CMS is public/admin/index.html.
  async rewrites() {
    return [{ source: "/admin", destination: "/admin/index.html" }];
  },
  images: {
    // Editors can paste any https image URL in the CMS; next/image resizes and
    // re-encodes it (WebP/AVIF) like the local ones.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    // Optimized variants are cached on the CDN for 30 days (keeps Vercel image
    // transformations low). Replace an image under a NEW file name to bust it.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
