// next.config.js
import type { NextConfig } from "next";
import withPWA from 'next-pwa';

// Create the PWA configuration
const withPWAConfig = withPWA({
  dest: 'public', // The folder where the service worker will be generated
  disable: process.env.NODE_ENV === 'development', // Disable PWA in development
  // More options can be added here
});

// Your original Next.js configuration
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

// Export the wrapped configuration
export default withPWAConfig(nextConfig);