/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [ {
      protocol: "https",
      hostname: "**.unsplash.com",
      port: '',
      pathname: '/**'
    } ]
  },
  experimental: {
    appDir: false
  }
}

module.exports = nextConfig
