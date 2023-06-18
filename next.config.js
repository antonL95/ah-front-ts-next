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
            {
                protocol: "https",
                hostname: "ah-strapi-aws-s3-media-bucket.s3.eu-central-1.amazonaws.com"
            }
        ],
    },
    env: {
        apiKey: "17ee504c2646b95435186b0855fb9535d23bedb0cb9cc5d99cd8349b43acc1fb165771bcb5b1a769517e3ddf334ec1a9566a787a2fa089dc5c2103789b18d1f0aafee5a35ba0b7b9d53ab9a052268b9643a3f0545cfbbcb27727d864e85b350e2a8a8ee5ba507ed2aa42be050ff5eba54c3a76ec6cd4e9aa1990b5a05915ee67",
        apiHost: "https://admin.artistshero.com/api"
    },
}

module.exports = nextConfig
