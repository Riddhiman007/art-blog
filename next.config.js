/** @type {import('next').NextConfig} */
const nextConfig = {
<<<<<<< HEAD
=======

>>>>>>> fc2a61e (deploy)
  images: {
    remotePatterns: [ { hostname: "images.unsplash.com", port: "", pathname: "/**" } ]
  },
  // experimental: {
  //   serverActions: true
  // },
  typescript: { ignoreBuildErrors: true },
  output: "export"
};

module.exports = nextConfig
