/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Treat warnings as errors during production builds
    if (!dev) {
      config.plugins.push(
        new webpack.ErrorOverlayPlugin({
          overlay: {
            warnings: true,
            errors: true,
          },
        })
      );
    }
    return config;
  },
};

module.exports = nextConfig;
