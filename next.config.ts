import path from "path";
import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["imagedelivery.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "imagedelivery.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pub-676e1cb87e8247329da59049363213c6.r2.dev",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
    ],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });


    // Strip source mapping URLs from framer-motion to prevent 404s in dev console and terminal
    config.module.rules.push({
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      include: /node_modules\/framer-motion/,
      use: [
        {
          loader: path.resolve('src/loaders/strip-sourcemap-loader.cjs'),
        },
      ],
    });

    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      { module: /node_modules\/framer-motion/ },
      /Failed to parse source map/
    ];

    return config;
  },
};

export default withPayload(nextConfig);