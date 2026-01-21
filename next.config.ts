import type { NextConfig } from "next";

import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
      // Add your CDN or image hosting domains here
      // Example:
      // {
      //   protocol: 'https',
      //   hostname: 'your-cdn-domain.com',
      // },
    ],
  },
};

export default withPayload(nextConfig);
