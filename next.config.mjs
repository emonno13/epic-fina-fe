import path from 'path';
import { fileURLToPath } from 'url';

// Manually define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@refinedev/antd'],
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        port: '',
        pathname: '/**', // Allow all paths from Google Drive
      },
      {
        protocol: 'https',
        hostname: 'accounts.google.com',
        port: '',
        pathname: '/**', // Allow all paths from Google Accounts
      },
    ],
  },
  webpack: (config) => {
    // Add SCSS alias support
    config.resolve.alias['@styles'] = path.resolve(__dirname, 'src/styles');
    return config;
  },
  // Uncomment the headers section if needed
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         {
  //           key: 'Cross-Origin-Embedder-Policy',
  //           value: 'unsafe-none',
  //         },
  //         {
  //           key: 'Cross-Origin-Opener-Policy',
  //           value: 'same-origin', // or "same-origin-allow-popups"
  //         },
  //         {
  //           key: 'Access-Control-Allow-Origin',
  //           value: '*',
  //         },
  //         {
  //           key: 'Access-Control-Allow-Methods',
  //           value: 'GET, POST, OPTIONS',
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;
