/** @type {import('next').NextConfig} */
const path = require('path');
const withPlugins = require('next-compose-plugins');
const CompressionPlugin = require('compression-webpack-plugin');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
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
  transpilePackages: ['shared-utils', 'design-system'],
  modularizeImports: {
    '@components': {
      transform: '@components/{{member}}',
      skipDefaultConversion: true,
    },
    '@utils/Common': {
      transform: '@utils/Common/{{ kebabCase member }}',
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
  // pageExtensions:
  //   process.env.NEXT_PUBLIC_PLATFORM_ENV === 'production'
  //     ? ['prod.tsx', 'prod.ts', 'prod.jsx', 'prod.js']
  //     : [
  //         'prod.tsx',
  //         'prod.ts',
  //         'prod.jsx',
  //         'prod.js',
  //         'dev.tsx',
  //         'dev.ts',
  //         'dev.jsx',
  //         'dev.js',
  //       ],
  webpack: (config, { isServer }) => {
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

    const prod = process.env.NEXT_PUBLIC_PLATFORM_ENV === 'production';

    if (prod) {
      config.plugins.push(new CompressionPlugin());
    } else {
      config.watchOptions = {
        ignored: [path.posix.resolve(__dirname, '../../packages/design-system/src/assets/icon')],
      };
    }

    if (!isServer && !prod) {
      config.plugins.push(
        new WebpackShellPluginNext({
          onBeforeBuild: {
            scripts: ['ts-node ../../packages/design-system/src/scripts/create-icon-mapping.ts'],
            blocking: false,
            parallel: false,
          },
          dev: prod,
        }),
      );
    }

    return config;
  },
};

module.exports = withPlugins([[withBundleAnalyzer]], nextConfig);
