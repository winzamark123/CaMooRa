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
    ],
  },
  transpilePackages: ['@pqina/pintura', '@pqina/react-pintura'],
};

export default withNextVideo(nextConfig);
