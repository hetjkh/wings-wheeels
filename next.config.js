/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.pexels.com', 'res.cloudinary.com', 'pps.whatsapp.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      
    ],
    // Optimize image loading
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    // Reduce image requests by optimizing sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Enable image optimization
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  // Add timeout for API routes
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
  // Redirect www to non-www and HTTP to HTTPS
  async redirects() {
    return [
      // Redirect www to non-www (301 permanent redirect)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.wwtravels.net',
          },
        ],
        destination: 'https://wwtravels.net/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
