/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tailus.io",
      },
    ],
  },
  // experimental: {
  //   appDir: true,
  // },
};

module.exports = nextConfig;
