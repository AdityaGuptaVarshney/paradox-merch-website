import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

    // ⛔ Disable ESLint during build
    eslint: {
      ignoreDuringBuilds: true,
    },
};

export default nextConfig;
