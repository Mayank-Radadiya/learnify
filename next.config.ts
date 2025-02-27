/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Ignores type errors during build
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignores ESLint errors
  },
  transpilePackages: ["react-quill", "react-quill-new"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
};

module.exports = nextConfig;
