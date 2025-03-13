/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['web-assets.same.dev'],
  },
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig
