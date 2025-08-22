import type {NextConfig} from 'next';

// This is to allow cross-origin requests in development.
// The value will be provided by the environment.
const allowedDevOrigins = process.env.ALLOWED_DEV_ORIGINS?.split(',') || [];

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
  allowedDevOrigins,
};

export default nextConfig;
