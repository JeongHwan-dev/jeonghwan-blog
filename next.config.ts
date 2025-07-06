import type { NextConfig } from 'next';

import createMDX from '@next/mdx';

const AWS_S3_IMAGE_DOMAIN = process.env.AWS_S3_IMAGE_DOMAIN || '';

const SUPABASE_STORAGE_DOMAIN = process.env.SUPABASE_STORAGE_DOMAIN || '';

const nextConfig: NextConfig = {
  images: {
    domains: [AWS_S3_IMAGE_DOMAIN, SUPABASE_STORAGE_DOMAIN],
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
