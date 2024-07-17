/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;


export let productimage = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'assets.example.com',
          port: '',
          pathname: '/account123/**',
        },
      ],
    },
  }