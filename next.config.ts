import withBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

const blobStorageDomain = process.env.VERCEL_BLOB_STORAGE_DOMAIN;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: blobStorageDomain === undefined ? [] : [{ hostname: blobStorageDomain }],
  },
  turbopack: {
    rules: {
      '*.svg': {
        as: '*.js',
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: [
                  { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
                ],
              },
            },
          },
        ],
      },
    },
  },
};

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default bundleAnalyzer(nextConfig);
