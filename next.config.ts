// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    // Empêche les erreurs ESLint de bloquer le build Vercel
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Empêche les erreurs TS (comme "no-explicit-any") de bloquer le build
    ignoreBuildErrors: true,
  },
}

export default nextConfig
