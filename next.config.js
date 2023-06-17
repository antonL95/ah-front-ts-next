/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gallery.artistshero.com',
        port: '',
        pathname: '/**-large_default/**',
      },
    ],
  },
}

module.exports = nextConfig
