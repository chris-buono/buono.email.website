import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    pageTitle: ' - buono.email',
    basePageTitle: 'buono.email',
    baseImage:'/buono.email_logo_og_image.jpg',
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
