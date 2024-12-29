import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.daisyui.com",
        port: "",
        pathname: "/images/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
        pathname: "/lens/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "aquamarine-accepted-haddock-468.mypinata.cloud",
        port: "",
        pathname: "/ipfs/**",
        search: "",
      }
    ],
    dangerouslyAllowSVG: true
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push('pino-pretty', 'encoding');
    return config;
  },
};

export default nextConfig;
