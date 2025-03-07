import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    pageTitle: ' - buono.email',
    basePageTitle: 'buono.email',
    version: '?v=EgTy8',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'buono.email',
        search: '?v=EgTy8',
      },
    ],
  },
};

export default nextConfig;
