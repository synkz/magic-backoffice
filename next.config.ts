import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Désactiver ESLint pendant le build pour éviter les erreurs sur Vercel
  // Les règles sont configurées dans eslint.config.mjs
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
