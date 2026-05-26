/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    cpus: 1,
    webpackBuildWorker: false,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
