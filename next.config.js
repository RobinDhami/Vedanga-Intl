/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.CPANEL_BUILD === "1" ? { output: "standalone" } : {}),
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    outputFileTracingIncludes: {
      "/api/admin/uploads": ["./node_modules/@img/sharp-linux-x64/**/*", "./node_modules/@img/sharp-libvips-linux-x64/**/*"],
    },
    cpus: 1,
    webpackBuildWorker: false,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
