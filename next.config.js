/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        serverActions: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'gallery.artistshero.com',
                port: '',
                pathname: '/**-large_default/**',
            },
            {
                protocol: "https",
                hostname: "ah-strapi-aws-s3-media-bucket.s3.eu-central-1.amazonaws.com"
            }
        ],
    }
}

module.exports = nextConfig
