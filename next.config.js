/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    remotePatterns: [ { hostname: "images.unsplash.com", port: "", pathname: "/**" } ]
  },
  // experimental: {
  //   serverActions: true
  // },
  typescript: { ignoreBuildErrors: true },
  output: "export",
    basePath: "/art-blog"
};

module.exports = nextConfig
