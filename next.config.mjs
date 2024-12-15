import { withNextVideo } from 'next-video/process';
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fomoo-bucket-local.s3.us-east-2.amazonaws.com',
        port: '',
        pathname: '/**', // Match all paths within the domain
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        port: '',
        pathname: '/**', // Match all paths within the domain
      },
      {
        // Staging CDN
        protocol: 'https',
        hostname: 'd2w4poctavf8a6.cloudfront.net',
        port: '',
        pathname: '/**', // Match all paths within the domain
      },
      {
        // Production CDN
        protocol: 'https',
        hostname: 'dmmuvefqy6r0i.cloudfront.net',
        port: '',
        pathname: '/**', // Match all paths within the domain
      },
    ],
  },
  transpilePackages: ['@pqina/pintura', '@pqina/react-pintura'],
};

export default withNextVideo(nextConfig);
