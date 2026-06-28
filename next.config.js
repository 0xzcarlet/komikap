/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Allow loading remote images from the Shinigami API domains. The reader
   * exposes images on `*.shngm.io` and `*.shngm.id`, so this configuration
   * enables the `next/image` component to fetch and optimize those images.
   */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.shngm.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.shngm.id',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;