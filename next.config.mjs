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
    ],
  },
};

export default nextConfig;
