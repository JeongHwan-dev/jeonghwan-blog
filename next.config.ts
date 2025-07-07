import type { NextConfig } from 'next';

import createMDX from '@next/mdx';

const domains: string[] = [process.env.VERCEL_BLOB_STORAGE_DOMAIN].filter(
  (domain): domain is string => Boolean(domain),
);

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

export default withMDX(nextConfig);
