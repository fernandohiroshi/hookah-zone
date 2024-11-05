import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "galeradonarguile.com.br" },
      { protocol: "https", hostname: "cdn.awsli.com.br" },
      { protocol: "https", hostname: "images.tcdn.com.br" },
    ],
  },
};

export default nextConfig;
