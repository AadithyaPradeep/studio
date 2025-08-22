import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // This is to allow cross-origin requests in development.
  // The value will be provided by the environment.
  allowedDevOrigins: process.env.ALLOWED_DEV_ORIGINS?.split(',') || [],
};

export default nextConfig;
