import type { NextConfig } from 'next';

import withBundleAnalyzer from '@next/bundle-analyzer';
import createMDX from '@next/mdx';
import { compact } from 'es-toolkit';

const domains: string[] = compact([process.env.VERCEL_BLOB_STORAGE_DOMAIN]);

const nextConfig: NextConfig = {
  images: {
    domains,
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

const withMDX = createMDX({});

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default bundleAnalyzer(withMDX(nextConfig));
