/** @type {import('next').NextConfig} */
const path = require('path');
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  swcMinify: true,
  compress: true,
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['firebasestorage.googleapis.com'],
    minimumCacheTTL: 31536000,
  },
  i18n: {
    locales: ['ko'],
    defaultLocale: 'ko',
  },
  transpilePackages: ['shared-utils', 'shared-hooks', 'design-system'],
  modularizeImports: {
    '@components': {
      transform: '@components/{{member}}',
      skipDefaultConversion: true,
    },
    '@utils': {
      transform: '@utils/{{ kebabCase member }}',
      skipDefaultConversion: true,
    },
    '@hooks': {
      transform: '@hooks/{{ kebabCase member }}',
      skipDefaultConversion: true,
    },
    '@containers': {
      transform: '@containers/{{member}}',
      skipDefaultConversion: true,
    },
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: false,
            svgoConfig: {
              plugins: [
                {
                  name: 'removeViewBox',
                  active: false,
                },
                {
                  name: 'convertStyleToAttrs',
                  active: true,
                },
              ],
            },
          },
        },
      ],
    });
    config.module.rules.push({
      test: /\.html$/,
      use: 'raw-loader',
    });

    return config;
  },
};

module.exports = withPlugins([[withBundleAnalyzer]], nextConfig);
