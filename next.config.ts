import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Miniatura del video de YouTube en la galería
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
};

export default nextConfig;
