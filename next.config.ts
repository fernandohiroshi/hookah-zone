import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "galeradonarguile.com.br" },
      { protocol: "https", hostname: "cdn.awsli.com.br" },
      { protocol: "https", hostname: "images.tcdn.com.br" },
      { protocol: "https", hostname: "cdn.zomoofficial.com" },
      { protocol: "https", hostname: "cdn11.bigcommerce.com" },
      { protocol: "https", hostname: "www.elitetabacariacvel.com.br" },
    ],
  },
};

export default nextConfig;
