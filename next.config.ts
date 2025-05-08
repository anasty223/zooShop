import { Configuration as WebpackConfig } from 'webpack';

const nextConfig = {
  webpack(config: WebpackConfig): WebpackConfig {
    config.module = config.module ?? {};
    config.module.rules = config.module.rules ?? [];
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;
