import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
  i18n: undefined, // Explicitly set i18n to satisfy older type definition
};

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // Disable PWA in development to avoid repeated service worker generation
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default withPWA(nextConfig as any); // Use type assertion to bypass type conflict