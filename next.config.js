/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/news", destination: "/updates", permanent: true },
      { source: "/news/notices", destination: "/updates", permanent: true },
      { source: "/news/:slug", destination: "/updates", permanent: true },
      { source: "/admin/news", destination: "/admin/updates", permanent: false },
      { source: "/admin/notices", destination: "/admin/updates", permanent: false },
    ];
  },
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
