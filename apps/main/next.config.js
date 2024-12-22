/** @type {import('next').NextConfig} */
const path = require('node:path');
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  experimental: {
    optimizePackageImports: [
      '@components',
      '@shared',
      'shared-utils',
      'shared-hooks',
      'design-system',
    ],
  },
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
  // NOTICE : 만약 pageExtensions를 사용하고 싶다면 아래 주석을 해제하고 사용하면 된다.
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
