/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gallery.artistshero.com",
        port: "",
        pathname: "/**-large_default/**",
      },
      {
        protocol: "https",
        hostname: "cdn.artistshero.com",
      },
    ],
  },
};

module.exports = nextConfig;
