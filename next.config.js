/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@neondatabase/serverless'],
  },
  // Garante que as páginas dinâmicas não sejam pré-renderizadas
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: '*.vercel-storage.com' },
      { protocol: 'https', hostname: 'www.edp.com.br' },
      { protocol: 'https', hostname: 'brand.edp.com' },
    ],
  },
}

module.exports = nextConfig
