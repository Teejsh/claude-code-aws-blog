import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: '/proxy/3000/:path*',
        destination: '/:path*',
      },
    ];
  },
};

export default withMDX(nextConfig);
