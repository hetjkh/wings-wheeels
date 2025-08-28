/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.pexels.com', 'res.cloudinary.com', 'pps.whatsapp.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      
    ]
  },
};

module.exports = nextConfig;
