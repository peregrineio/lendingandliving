import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ISR blog routes read MDX from the filesystem at runtime — ensure the
  // content directory ships inside the serverless function bundles.
  outputFileTracingIncludes: {
    '/blog': ['./src/content/blog/**/*'],
    '/blog/[slug]': ['./src/content/blog/**/*'],
    '/sitemap.xml': ['./src/content/blog/**/*'],
  },
  /* config options here */
};

export default nextConfig;
