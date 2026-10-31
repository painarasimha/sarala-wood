import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Pin the workspace root so Next does not walk up into the home directory.
  turbopack: { root: process.cwd() },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [60, 72, 82, 90],
    deviceSizes: [360, 414, 640, 828, 1080, 1280, 1600, 1920, 2560],
    imageSizes: [96, 160, 240, 320, 420, 560, 720],
  },
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: ['framer-motion', 'gsap'],
  },
}

export default nextConfig
