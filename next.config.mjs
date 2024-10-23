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
  // async headers() {
  //   return [
  //     {
  //       // Matching all routes for CORS
  //       source: '/(.*)',
  //       headers: [
  //         // {
  //         //   key: 'Cross-Origin-Embedder-Policy',
  //         //   value: 'unsafe-none',
  //         // },
  //         // {
  //         //   key: 'Cross-Origin-Opener-Policy',
  //         //   value: 'same-origin', // "same-origin-allow-popups"
  //         // },
  //         // {
  //         //   key: 'Access-Control-Allow-Origin',
  //         //   value: '*', // Make sure to adjust this in production for security
  //         // },
  //         // {
  //         //   key: 'Access-Control-Allow-Methods',
  //         //   value: 'GET, POST, OPTIONS',
  //         // },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;
