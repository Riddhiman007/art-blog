/** @type {import('next').NextConfig} */
const nextConfig = {
  //**rewrites: async () => {
  //return [
  //{
  // source: "/backend/:path*",
  //destination:
  //process.env.NODE_ENV === "development"
  //  ? "http://127.0.0.1:8000/api/:path*"
  //    : "/backend/",
  //},
  //];
  //},
  images: {
    remotePatterns: [ { hostname: "images.unsplash.com", port: "", pathname: "/**" } ]
  },
  // experimental: {
  //   serverActions: true
  // },
  typescript: { ignoreBuildErrors: true },
  // output: "export",
  // basePath: "/art-blog"
};

module.exports = nextConfig
