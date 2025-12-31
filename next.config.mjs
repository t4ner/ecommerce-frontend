/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },

    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
  // Production optimizasyonları
  compress: true,
  poweredByHeader: false,
  // Build optimizasyonları
  experimental: {
    optimizePackageImports: ["@tanstack/react-query", "keen-slider"],
  },
};

export default nextConfig;
