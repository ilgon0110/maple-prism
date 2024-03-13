/** @type {import('next').NextConfig} */
const prod = process.env.NODE_ENV === "production";
const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
  disable: prod ? false : true,
});

const nextConfig = withPWA({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tailwindui.com",
      },
      {
        protocol: "https",
        hostname: "avatar.maplestory.nexon.com",
      },
      {
        protocol: "https",
        hostname: "open.api.nexon.com",
      },
    ],
    dangerouslyAllowSVG: true,
  },
});

module.exports = nextConfig;
