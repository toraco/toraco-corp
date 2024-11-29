/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.microcms-assets.io'],
    minimumCacheTTL: 60,
    unoptimized: true,
  },
};

module.exports = nextConfig;
