import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['http://localhost:3090'],
  transpilePackages: ['@repo/ui'],
  webpack: (config) => {
    // Resolve CSS imports from @repo/ui package
    config.resolve.alias = {
      ...config.resolve.alias,
      '@repo/ui/styles.css': path.resolve(__dirname, '../../packages/ui/src/styles.css'),
    };
    return config;
  },
};

export default nextConfig;
