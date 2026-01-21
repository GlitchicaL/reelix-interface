import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowLocalIP: true, // Only for private networks
    remotePatterns: [
      new URL('http://**:8080/**'),
    ],
  }
};

export default nextConfig;
